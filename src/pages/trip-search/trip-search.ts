import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';

import { Trip } from '../../models/trip';
import { TripsProvider } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-trip-search',
  templateUrl: 'trip-search.html'
})
export class TripSearchPage {
  private ngUnsubscribe: Subject<Trip> = new Subject<Trip>();

  currentTrips: Trip[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public tripsProvider: TripsProvider) { }

  /**
   * Perform a service for the proper trips.
   */
  getTrips(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentTrips = [];
      return;
    }
    this.tripsProvider.query([
      {
        field: 'name',
        type: 'substr',
        value: val
      }
    ])
    .takeUntil(this.ngUnsubscribe)
    .subscribe((trips: Trip[]) => {
      // console.log(trips);
      this.currentTrips = trips;
    });
  }

  ionViewWillUnload() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /**
   * Navigate to the detail page for this trip.
   */
  openTrip(tripId: string) {
    this.navCtrl.push('TripDetailPage', {
      tripId: tripId
    });
  }

}
