import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from 'angularfire2/storage';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {
  private afStorageRef: AngularFireStorageReference;

  constructor(private afStorage: AngularFireStorage) {
    this.afStorageRef = this.afStorage.ref('images');
  }

  upload(file: File, metadata?: Partial<{name: string, contentType: string, size: number}>): AngularFireUploadTask {
    console.log('Uploading the file on Firebase storage.');
    return this.afStorageRef.child((metadata && metadata.name) || file.name).put(file, metadata);
  }

  delete(filePath: string) {
    return this.afStorage.ref(filePath).delete();
  }
}