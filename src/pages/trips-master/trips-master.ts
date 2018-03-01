import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Trip } from '../../models/trip';
import { Trips } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-trips-master',
  templateUrl: 'trips-master.html'
})
export class TripsMasterPage {
  currentTrips: Trip[];

  constructor(public navCtrl: NavController, public trips: Trips, public modalCtrl: ModalController) {
    this.currentTrips = this.trips.query();
  }

  /**
   * The view loaded, let's query our trips for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new trip. This shows our TripCreatePage in a
   * modal and then adds the new trip to our data source if the user created one.
   */
  addTrip() {
    let addModal = this.modalCtrl.create('TripCreatePage');
    addModal.onDidDismiss(trip => {
      if (trip) {
        this.trips.add(trip);
        console.log(JSON.stringify(trip));
      }
    })
    addModal.present();
  }

  /**
   * Delete an trip from the list of trips.
   */
  deleteTrip(trip, event: Event) {
    event.stopPropagation();
    this.trips.delete(trip);
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
