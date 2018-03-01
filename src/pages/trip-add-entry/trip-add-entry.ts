import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { Itinerary } from '../../models/itinerary';
import { Entry } from '../../models/entry';

/**
 * Generated class for the TripAddEntryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trip-add-entry',
  templateUrl: 'trip-add-entry.html'
})
export class TripAddEntryPage {
  entry: Entry;
  entryGroups: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.entryGroups = Itinerary.getEntryGroups();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TripAddEntryPage');
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the trip, so return it
   * back to the presenter.
   */
  done() {
    // if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.entry);
  }

  openNewEntryForm(entryGroup: string, entryType: string) {
    ;
  }

}
