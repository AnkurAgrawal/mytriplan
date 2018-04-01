import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';

import { Trip } from '../../models/trip';
import { TripsProvider } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-trips-master',
  templateUrl: 'trips-master.html'
})
export class TripsMasterPage {
  currentTrips: Trip[];

  constructor(private navCtrl: NavController, private tripsProvider: TripsProvider, private modalCtrl: ModalController) {
    // Get trips form firebase using Firestype api
    this.tripsProvider.getReadonlyTrips().subscribe((trips: Trip[]) => {
      this.currentTrips = trips;
    });

    // Add trips to the database
    // this.currentTrips.forEach(trip => this.firebaseProvider.addDocument<Trip>(trip, "trips"))
  }

  /**
   * The view loaded, let's query our trips for the list
   */
  ionViewDidLoad() { }

  /**
   * Prompt the user to add a new trip. This shows our TripCreatePage in a
   * modal and then adds the new trip to our data source if the user created one.
   */
  addTrip() {
    // this.navCtrl.push('TripCreatePage');
    let addModal = this.modalCtrl.create('TripCreatePage');
    addModal.onDidDismiss((trip: Trip) => {
      if (trip) {
        this.tripsProvider.add(trip);
        this.openTrip(trip.id);
      }
    })
    addModal.present();
  }

  /**
   * Delete an trip from the list of trips.
   */
  deleteTrip(trip, event: Event) {
    event.stopPropagation();
    this.tripsProvider.delete(trip);
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
