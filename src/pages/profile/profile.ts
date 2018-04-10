import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading } from 'ionic-angular';
import { User } from 'firebase/app';

import { AuthServiceProvider, PhotoProvider, StorageProvider } from '../../providers/providers';
import { SanitizeStringPipe } from '../../pipes/sanitize-string/sanitize-string';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [
    SanitizeStringPipe
  ],
})
export class ProfilePage {
  @ViewChild('fileInput') fileInput;
  private loading: Loading;

  user: User;

  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController, private auth: AuthServiceProvider, private photoProvider: PhotoProvider, private storage: StorageProvider, private sanitizer: SanitizeStringPipe) {
    this.user = this.auth.getCurrentUser();
  }

  ionViewDidLoad() { }

  getPicture() {
    this.photoProvider.getPicture().then(data => {
      data? this.updateUserPhoto(data, this.user.email + '.jpg'): this.fileInput.nativeElement.click()
    });
  }

  processWebPicture(event) {
    console.log('Processing web picture.');
    const file: File = event.target.files[0];
    const filename: string = this.user.email + '.' + this.getExtension(file.name);

    this.updateUserPhoto(file, filename);
  }

  private getExtension(filename): string {
    return filename.substring(filename.lastIndexOf('.') + 1, filename.length) || filename;
  }

  updateUserPhoto(file: File | string, filename?: string) {
    console.log('Updating user photo.');
    console.log(JSON.stringify(file));
    console.log(file);

    this.storage.upload(file, {name: filename || ((typeof file === 'object')? this.sanitizer.transform(file['name']): ''), contentType: typeof file === 'object'? file.type: 'image/jpeg'}).then().then(res =>
      this.auth.updateUser({photoURL: res.metadata.downloadURLs[0]})
      .then(() => this.loading.dismiss().then(() => console.log('User photo updated successfully.')))
      .catch(error => this.loading.dismiss().then(() => console.log(error)))
    );

    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }

  updateUserDisplayName(name: string) {
    this.auth.updateUser({displayName: name}).then(data => console.log('User display name updated successfully.'));
  }
}
