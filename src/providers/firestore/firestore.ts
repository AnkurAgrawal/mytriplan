import { Injectable } from '@angular/core';
import { QueryFn } from 'angularfire2/firestore';
import { Query } from '@firebase/firestore-types';
import { AngularFirestype, Collection, Document } from 'angular-firestype';
import { Observable } from 'rxjs/Observable';
/*
  Generated class for the FirstoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirestoreProvider {

  constructor(public afs: AngularFirestype) { }

  private generateDocumentId() {
    return this.afs.createId();
  }

  query<T>(collection: string, queryFn?: QueryFn): Collection<T> {

    return this.getCollection<T>(collection, queryFn);
  }

  queryObservable<T>(collection: string, queryFn?: QueryFn): Observable<T[]> {
    return this.getObservableCollection<T>(collection, queryFn);
  }

  getCollection<T>(collectionPath: string, queryFn?: QueryFn): Collection<T> {
    return this.afs.collection<T>(collectionPath, queryFn || (ref => ref.orderBy('dateFrom', 'asc')));
  }

  getObservableCollection<T>(collection: string | Collection<T>, queryFn?: QueryFn): Observable<T[]> {
    if (collection && typeof collection === 'string') {
      collection = this.getCollection<T>(collection, queryFn);
    }
    return (collection as Collection<T>).valueChanges();
  }

  getEditableCollection<T>(collection: string | Collection<T>, queryFn?: QueryFn): Observable<T[]> {
    if (collection && typeof collection === 'string') {
      collection = this.getCollection<T>(collection, queryFn);
    }
    return (collection as Collection<T>).snapshotChanges().map(actions => {
      return actions.map(a => {
        return a.payload.doc.data() as T;
      });
    });
  }

  getDocument<T>(documentPath: string, collection?: string | Collection<T>): Document<T> {
    if (collection && typeof collection === 'string') {
      return this.afs.doc<T>(collection + '/' + documentPath);
    }
    return collection? (collection as Collection<T>).doc<T>(documentPath): this.afs.doc<T>(documentPath);
  }

  getObservableDocument<T>(documentPath: string, collection?: string | Collection<T>): Observable<T> {
    return this.getDocument<T>(documentPath, collection).valueChanges();
  }

  getEditableDocument<T>(documentPath: string, collection?: string | Collection<T>): Observable<T> {
    return this.getDocument<T>(documentPath, collection).snapshotChanges().map(action => {
      return action.payload.data() as T
    });
  }

  addDocument<T>(document: T, collection: string | Collection<T>): void {
    console.log("Adding new trip");
    if (typeof collection === 'string') {
      collection = this.getCollection<T>(collection);
    }
    document['id'] = document['id'] || this.generateDocumentId();
    (collection as Collection<T>).doc(document['id']).set(document);
  }

  deleteDocument<T>(document: T, collection: string | Collection<T>): Promise<void> {
    console.log("Deleting trip");
    return this.getDocument(document['id'], collection).delete();
  }

  // TODO write partial class implementation
  updateDocument<T>(partialDocument: Partial<T>, collection: string | Collection<T>): Promise<void> {
    console.log("Updating trip");
    console.log(partialDocument);
    if (partialDocument['id'] === undefined) {
      console.error('Cannot update the document without ID.');
    }
    return this.getDocument<T>(partialDocument['id'], collection).update(partialDocument);
  }
}
