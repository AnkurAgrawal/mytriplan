import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Trip } from '../../models/trip';
import { TripsProvider } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-plan-trip',
  templateUrl: 'plan-trip.html'
})
export class PlanTripPage {

  currentTrips: any = [];

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
    this.currentTrips = this.tripsProvider.query({
      name: val
    });
  }

  /**
   * Navigate to the detail page for this trip.
   */
  openTrip(trip: Trip) {
    this.navCtrl.push('TripDetailPage', {
      trip: trip
    });
  }

}
