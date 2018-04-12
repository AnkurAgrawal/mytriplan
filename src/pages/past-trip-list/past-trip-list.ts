import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { TranslateService } from '@ngx-translate/core';

import { Trip } from '../../models/trip';
import { TripsProvider } from '../../providers/providers';
import { MomentPipe } from '../../pipes/moment/moment';

/**
 * Generated class for the PastTripListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-past-trip-list',
  templateUrl: 'past-trip-list.html',
  providers: [
    MomentPipe
  ]
})
export class PastTripListPage {
  private ngUnsubscribe: Subject<Trip> = new Subject<Trip>();

  currentTrips: Trip[];

  constructor(public navCtrl: NavController, private tripsProvider: TripsProvider, private moment: MomentPipe, private translate: TranslateService) {
    // Get trips form firebase using Firestype api
    this.translate.get('DATABASE_DATE_FORMAT').subscribe((dateFormat) =>
      this.tripsProvider.query({
        dateFrom: {
          type: '<',
          value: this.moment.transform(new Date().toString(), dateFormat)
        }
      })
      .takeUntil(this.ngUnsubscribe)
      .subscribe((trips: Trip[]) => {
        this.currentTrips = trips;
      })
    );
  }

  ionViewDidLoad() { }

  ionViewWillUnload() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
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
      tripId: tripId,
      readonly: true
    });
  }

}
