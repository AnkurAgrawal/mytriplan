import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from 'firebase/app';

import { AuthServiceProvider, PhotoProvider } from '../../providers/providers';

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
})
export class ProfilePage {
  @ViewChild('fileInput') fileInput;
  downloadUrl: any;

  user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthServiceProvider, private photoProvider: PhotoProvider) {
    this.user = this.auth.getCurrentUser();
  }

  ionViewDidLoad() { }

  getPicture() {
    this.photoProvider.getPicture().then(data =>
      data? this.updateUserPhoto(data): this.fileInput.nativeElement.click()
    );
  }

  processWebPicture(event) {
    console.log('Processing web picture.');
    this.photoProvider.processWebPicture(event.target.files[0], (this.sanatize(this.user.displayName) || 'profile') + '.' + this.getExtension(event.target.files[0].name)).then(data => this.updateUserPhoto(data));
  }

  private getExtension(filename): string {
    return filename.substring(filename.lastIndexOf('.') + 1, filename.length) || filename;
  }

  private sanatize(text: string): string {
    return text.replace(/\s/gi, '_');
  }

  updateUserPhoto(imageData: string) {
    console.log('Updating user photo.');
    this.auth.updateUser({photoURL: imageData})
    .then(() => console.log('User photo updated successfully.'))
    .catch(error => console.log(error));
  }

  updateUserDisplayName(name: string) {
    this.auth.updateUser({displayName: name}).then(data => console.log('User display name updated successfully.'));
  }
}
