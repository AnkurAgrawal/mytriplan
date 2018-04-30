import { Component } from '@angular/core';
import { App, IonicPage, NavController, ViewController } from 'ionic-angular';

/**
 * Generated class for the TripListOptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trip-list-options',
  templateUrl: 'trip-list-options.html',
})
export class TripListOptionsPage {

  constructor(private app: App, private navCtrl: NavController, private viewCtrl: ViewController) { }

  ionViewDidLoad() { }

  openPastTripList() {
    this.viewCtrl.dismiss().then(() => this.app.getRootNav().push('PastTripListPage'));
  }
}
