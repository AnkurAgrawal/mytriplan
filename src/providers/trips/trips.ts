import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Query, CollectionReference } from '@firebase/firestore-types';
import { Collection, Document } from 'angular-firestype';

import { Trip, PartialTrip } from '../../models/trip';
import { User } from '../../models/user';
import { Api } from '../api/api';
import { FirestoreProvider } from '../firestore/firestore';

@Injectable()
export class TripsProvider {
   readonly currentDb: Database.Type = Database.Type.Firestore;
   readonly collectionName: string = 'trips';

   private _trips: Collection<Trip>;
   private _readonlyTrips: Observable<Trip[]>;
   private _editableTrips: Observable<Trip[]>;

  constructor(private api: Api, private firestore: FirestoreProvider) { }

  getTrips(): Collection<Trip> {
    console.log('Fetching all the trips from Google Firestore.');
    return this._trips || (this._trips = this.firestore.getCollection<Trip>(this.collectionName));
  }

  getReadonlyTrips(): Observable<Trip[]> {
    console.log('Fetching all the trips from Google Firestore.');
    return this._readonlyTrips || (this._readonlyTrips = this.firestore.getObservableCollection<Trip>(this.getTrips()));
  }

  getEditableTrips(): Observable<Trip[]> {
    return this._editableTrips || (this._editableTrips = this.firestore.getEditableCollection<Trip>(this.getTrips()));
  }

  getTrip(tripId: string): Document<Trip> {
    console.log(`Fetching the trip (${tripId}) from Google Firestore.`);
    return this.firestore.getDocument<Trip>(tripId, this.getTrips() || this.collectionName);
  }

  getReadonlyTrip(tripId: string): Observable<Trip> {
    console.log(`Fetching the trip (${tripId}) from Google Firestore.`);
    return this.firestore.getObservableDocument<Trip>(tripId, this.getTrips() || this.collectionName);
  }

  getEditableTrip(tripId: string): Observable<Trip> {
    console.log(`Fetching the trip (${tripId}) from Google Firestore.`);
    return this.firestore.getEditableDocument<Trip>(tripId, this.getTrips() || this.collectionName);
  }

  query(params?: {field: string, type: string, value: string | number }[]): Observable<Trip[]> {
    switch (this.currentDb) {
      default:
      case Database.Type.Firestore:
        return this.firestore.queryObservable<Trip>(this.collectionName, ref => {
          let query: CollectionReference | Query = ref;
          params.forEach((param) => {
            console.log(param);
            switch (param.type) {
              case "substr":
                query = query.orderBy(param.field);
                break;

              case ">=":
                query = query.orderBy(param.field);
                break;

              case "<":
                query = query.orderBy(param.field, 'desc');
                break;

              case "startAt":
                query = query.orderBy(param.field);
                break;

              case "endBefore":
                query = query.orderBy(param.field);
                break;

              default:
                break;
            }
          });
          params.forEach((param) => {
            switch (param.type) {
              case "substr":
                query = query.startAt(param.value).endAt(param.value + 'z');
                // query.where(key, '>=', params[key].value).where(key, '<=', params[key].value + 'z');
                break;

              case ">=":
                query = query.where(param.field, '>=', param.value);
                break;

              case "<":
                query = query.where(param.field, '<', param.value);
                break;

              case "==":
                query = query.where(param.field, '==', param.value);
                break;

              case "startAt":
                query = query.startAt(param.value);
                break;

              case "endBefore":
                query = query.endBefore(param.value);
                break;

              default:
                break;
            }
          });
          return query;
        });
      case Database.Type.Firebase:
        // TODO code for firebase
        return null;
      case Database.Type.WebApi:
        // return this.api.get('/trips', params).subscribe(data => console.log(data));
        return null;
    }
  }

  add(trip: Trip) {
    switch (this.currentDb) {
      default:
      case Database.Type.Firestore:
        console.log(trip);
        this.firestore.addDocument<Trip>(trip, this.collectionName);
        break;
      case Database.Type.Firebase:
        // TODO code for firebase
        break;
      case Database.Type.WebApi:
        // TODO code for web-server api
        this.api.post('/trips/add', trip)
          .subscribe(data => console.log(data));
        break;
    }
  }

  delete(trip: Trip) {
    switch (this.currentDb) {
      default:
      case Database.Type.Firestore:
        this.firestore.deleteDocument<Trip>(trip, this.getTrips() || this.collectionName);
        break;
      case Database.Type.Firebase:
        // TODO code for firebase
        break;
      case Database.Type.WebApi:
        // TODO code for web-server api
        this.api.post('/trips/delete', trip)
          .subscribe(data => console.log(data));
        break;
    }
  }

  update(partialTrip: PartialTrip) {
    switch (this.currentDb) {
      default:
      case Database.Type.Firestore:
        this.firestore.updateDocument<Trip>(partialTrip, this.getTrips() || this.collectionName);
        break;
      case Database.Type.Firebase:
        // TODO code for firebase
        break;
      case Database.Type.WebApi:
        // TODO code for web-server api
        this.api.post('/trips/update', partialTrip)
          .subscribe(data => console.log(data));
        break;
    }
  }

}

module Database {
  export enum Type {
    Firestore,
    Firebase,
    WebApi
  }
}