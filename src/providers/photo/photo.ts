import { Injectable } from '@angular/core';
import { ActionSheetController, Platform } from 'ionic-angular';
import { Camera, CameraOptions, PictureSourceType, DestinationType, MediaType, EncodingType } from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path';

/*
  Generated class for the PhotoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PhotoProvider {

  constructor(private camera: Camera, public platform: Platform, private filePath: FilePath, private actionSheetCtrl: ActionSheetController) { }

  getPicture(): Promise<File | string> {
    return new Promise<File | string>(resolve => {
      if (Camera['installed']()) {
        let actionSheet = this.actionSheetCtrl.create({
          title: 'Select Image Source',
          buttons: [
            {
              text: 'Load from Library',
              handler: () => {
                resolve(this.takePicture({sourceType: PictureSourceType.PHOTOLIBRARY}));
              }
            },
            {
              text: 'Use Camera',
              handler: () => {
                resolve(this.takePicture({sourceType: PictureSourceType.CAMERA}));
              }
            },
            {
              text: 'Cancel',
              role: 'cancel',
              icon: !this.platform.is('ios') ? 'close' : null,
              handler: () => {
                resolve(null);
              }
            }
          ]
        });
        actionSheet.present();
      } else {
        resolve(null);
      }
    });
  }

  /**
    *
    * Select an image from the device photo library or capture from camera
    *
    * @public
    * @method takePicture
    * @return {Promise}
    */
  takePicture(cameraOptions?: Partial<CameraOptions>): Promise<File | string> {
    return new Promise<File | string>(resolve => {
      // Create options for the Camera Dialog
      let defaultCameraOptions: CameraOptions = {
        quality : 100,
        allowEdit: true,
        targetWidth : 375,
        targetHeight : 341,
        saveToPhotoAlbum: false,
        correctOrientation : true,
        mediaType: MediaType.PICTURE,
        encodingType : EncodingType.JPEG,
        sourceType: PictureSourceType.CAMERA,
        destinationType : DestinationType.FILE_URL
      };
      Object.assign(defaultCameraOptions, cameraOptions);

      // Get the data of an image
      this.camera.getPicture(defaultCameraOptions).then(data => {
        if (defaultCameraOptions.destinationType === DestinationType.FILE_URL || defaultCameraOptions.destinationType === DestinationType.NATIVE_URI) {
          console.log(JSON.stringify(data));

          // Special handling for Android library
          if (this.platform.is('android') && defaultCameraOptions.sourceType === PictureSourceType.PHOTOLIBRARY) {
          this.platform.ready().then(() => {
            let imagePath = data;
            // this.filePath.resolveNativePath(data).then(imagePath => {
              let correctPath: string = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
              let currentName: string = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
              console.log(correctPath, currentName);
              (<any>window).resolveLocalFileSystemURL(correctPath + currentName, fileEntry =>
                fileEntry.file(file => {
                  let reader: FileReader = new FileReader();
                  reader.onloadend = (evt: any) => {
                    var imgBlob: any = new Blob([evt.target.result], { type: 'image/jpeg' });
                    imgBlob.name = currentName;
                    resolve(imgBlob);
                  };

                  reader.readAsArrayBuffer(file);
                })
              );
            // });
          });
          } else {
            let correctPath: string = data.substr(0, data.lastIndexOf('/') + 1);
            let currentName: string = data.substr(data.lastIndexOf('/') + 1);
            console.log(correctPath, currentName);
            (<any>window).resolveLocalFileSystemURL(correctPath + currentName, fileEntry =>
              fileEntry.file(file => {
                let reader: FileReader = new FileReader();
                reader.onloadend = (evt: any) => {
                  var imgBlob: any = new Blob([evt.target.result], { type: 'image/jpeg' });
                  imgBlob.name = currentName;
                  resolve(imgBlob);
                };

                reader.readAsArrayBuffer(file);
              })
            );
          }
        } else if (defaultCameraOptions.destinationType === DestinationType.DATA_URL) {
          resolve('data:image/jpg;base64,' + data as string);
        } else {
          resolve(null);
        }
      }, (err) => {
        console.error('Unable to take photo.');
        resolve(null);
      })
    });
  }
}
