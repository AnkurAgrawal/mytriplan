import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from 'angularfire2/storage';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {
  private root: string = 'images';
  private afStorageRef: AngularFireStorageReference;

  constructor(private afStorage: AngularFireStorage) {
    this.afStorageRef = this.afStorage.ref(this.root);
  }

  setUploadDirectory(directoryPath: string): StorageProvider {
    this.afStorageRef = this.afStorage.ref(this.root = directoryPath);
    return this;
  }

  upload(file: File | string, metadata?: Partial<{name: string, contentType: string, size: number}>): AngularFireUploadTask {
    console.log('Uploading the file on Firebase storage.');
    console.log(metadata);
    if (typeof file === 'string') {
      return this.afStorageRef.child((metadata && metadata.name) || `${new Date().getTime()}`).putString(file, 'base64', metadata);
    } else {
      return this.afStorageRef.child((metadata && metadata.name) || file.name).put(file, metadata);
    }
  }

  delete(filePath: string) {
    return this.afStorageRef.child(filePath).delete();
  }

  getMetadata(filePath: string) {
    return this.afStorageRef.child(filePath).getMetadata();
  }
}
