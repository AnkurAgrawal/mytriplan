import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading } from 'ionic-angular';
import { User } from 'firebase/app';

import { AuthServiceProvider, StorageProvider } from '../../providers/providers';
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

  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController, private auth: AuthServiceProvider, private storage: StorageProvider, private sanitizer: SanitizeStringPipe) {
    this.user = this.auth.getCurrentUser();
  }

  ionViewDidLoad() { }

  private getExtension(filename: string): string {
    return filename.substring(filename.lastIndexOf('.') + 1, filename.length) || filename;
  }

  updateUserPhoto(file: File | string) {
    console.log('Updating user photo.');
    const filename: string = (this.sanitizer.transform(this.user.email) + '.' + ((typeof file === 'object')? this.getExtension(file.name): 'jpg')).replace("\'", '');

    this.storage.setUploadDirectory('images/users').upload(file, {
      name: filename,
      contentType: typeof file === 'object'? file.type: 'image/jpeg'
    }).then().then(res =>
      this.auth.updateUser({
        photoURL: res.metadata.downloadURLs[0]
      })
      .then(() => this.loading.dismiss().then(() => console.log('User photo updated successfully.')))
      .catch(error => this.loading.dismiss().then(() => console.log(error)))
    );

    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }

  updateUserDisplayName(name: string) {
    this.auth.updateUser({
      displayName: name
    }).then(data => console.log('User display name updated successfully.'));
  }
}
