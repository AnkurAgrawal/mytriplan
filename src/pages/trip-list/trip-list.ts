import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, PopoverController } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { TranslateService } from '@ngx-translate/core';

import { Trip } from '../../models/trip';
import { TripsProvider } from '../../providers/providers';
import { MomentPipe } from '../../pipes/moment/moment';

@IonicPage()
@Component({
  selector: 'page-trip-list',
  templateUrl: 'trip-list.html',
  providers: [
    MomentPipe
  ]
})
export class TripListPage {
  private ngUnsubscribe: Subject<Trip> = new Subject<Trip>();

  currentTrips: Trip[];

  constructor(private navCtrl: NavController, private tripsProvider: TripsProvider, private modalCtrl: ModalController, private popoverCtrl: PopoverController, private moment: MomentPipe, private translate: TranslateService) {
    // Get trips form firebase using Firestype api
    this.translate.get('DATABASE_DATE_FORMAT').subscribe((dateFormat) =>
      this.tripsProvider.query({
        dateFrom: {
          type: '>=',
          value: this.moment.transform(new Date().toString(), dateFormat)
        }
      })
      .takeUntil(this.ngUnsubscribe)
      .subscribe((trips: Trip[]) => {
        this.currentTrips = trips;
      })
    );
    // Add trips to the database
    // this.currentTrips.forEach(trip => this.firebaseProvider.addDocument<Trip>(trip, "trips"))
  }

  /**
   * The view loaded, let's query our trips for the list
   */
  ionViewDidLoad() { }

  ionViewWillUnload() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  showPopover(event) {
    let popover = this.popoverCtrl.create('TripListOptionsPage');
    popover.present({
      ev: event
    });
  }

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
