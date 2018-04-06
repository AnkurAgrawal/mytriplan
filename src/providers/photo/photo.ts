import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';

/*
  Generated class for the PhotoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PhotoProvider {

  constructor(private camera: Camera) { }

  /**
    *
    * Select an image from the device photo library or capture from camera
    *
    * @public
    * @method getPicture
    * @return {Promise}
    */
  getPicture(): Promise<string> {
    return new Promise(resolve => {
      if (Camera['installed']()) {
        let cameraOptions : CameraOptions = {
          destinationType : this.camera.DestinationType.DATA_URL,
          quality : 100,
          targetWidth : 375,
          targetHeight : 341,
          encodingType : this.camera.EncodingType.JPEG,
          correctOrientation : true
        };
        this.camera.getPicture(cameraOptions).then((data) => {
          resolve('data:image/jpg;base64,' + data);
        }, (err) => {
          console.error('Unable to take photo.');
          resolve(null);
        })
      } else {
        resolve(null);
      }
    });
  }

  processWebPicture(file) {
    return new Promise<string>(resolve => {
      let reader = new FileReader();
      reader.onload = (readerEvent) => {
        resolve((readerEvent.target as any).result);
      };

      reader.readAsDataURL(file);
    });
  }
}
