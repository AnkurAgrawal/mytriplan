import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from 'firebase/app';

import { AuthServiceProvider } from '../../providers/providers';

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
  user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthServiceProvider) {
    this.user = this.auth.getCurrentUser();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.user.displayName;
  }

}
