import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { FadeInOut } from '../../animations/animations.module';
import { Subject } from 'rxjs/Subject';

import { TripsProvider } from '../../providers/providers';
import { Trip } from '../../models/trip';

@IonicPage()
@Component({
  selector: 'page-trip-detail',
  templateUrl: 'trip-detail.html',
  animations: [
    FadeInOut
  ]
})
export class TripDetailPage {
  private ngUnsubscribe: Subject<Trip> = new Subject<Trip>();

  trip: Trip;
  itinerary: string;
  detail: string;
  readonly: boolean;
  private tripDates: any[];

  constructor(public tripsProvider: TripsProvider, public navCtrl: NavController, navParams: NavParams, public modalCtrl: ModalController, private translate: TranslateService) {
    this.readonly = (navParams.get('readonly') || false) as boolean;

    this.tripsProvider.getReadonlyTrip(navParams.get('tripId'))
      .takeUntil(this.ngUnsubscribe)
      .subscribe(trip => {
      if (trip) {
        this.trip = trip;
        this.tripDates = this.trip.dates;
        this.itinerary = this.itinerary || this.tripDates[(this.trip.daysLeft < 0 && this.trip.daysAgo <= 0)? Math.abs(this.trip.daysLeft): 0];
      }
    });
    this.detail = 'plans';
  }

  ionViewDidLoad() { }

  ionViewWillUnload() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  editTrip() {
    console.log('Editing trip: ' + this.trip.name);

    let addModal = this.modalCtrl.create('TripCreatePage', {
      mode: 'edit',
      trip: this.trip
    });
    addModal.onDidDismiss(updated => {
      // Update plan on the web-service
      if (updated) {
        this.tripsProvider.update(this.trip.getPartial(['name', 'description', 'tripPic', 'destination', 'dateFrom', 'dateTo']));
      }
    });
    addModal.present();
  }

  openPlan(plan) {
    // console.log("Open: " + JSON.stringify(plan));
    let addModal = this.modalCtrl.create('TripViewPlanPage', {
      plan: plan,
      from: this.trip.dateFrom,
      to: this.trip.dateTo,
      readonly: this.readonly
    });
    addModal.onDidDismiss(updated => {
      // Update plan on the web-service
      if (updated) {
        this.tripsProvider.update(this.trip.getPartial(['itinerary']));
      }
    });
    addModal.present();
  }

  deletePlan(plan) {
    console.log("Delete: " + JSON.stringify(plan));
    this.trip.deletePlan(plan);
    this.tripsProvider.update(this.trip.getPartial(['itinerary']));
  }

  openAddPlan(date: string) {
    let displayDateFormat = 'MMM DD, YYYY';
    this.translate.get('DISPLAY_DATE_FORMAT').subscribe((value) => displayDateFormat = value);
    // console.log('Opening Add Plan: ' + JSON.stringify(this.trip));

    let addPlanModal = this.modalCtrl.create('TripAddPlanPage', { date: date, from: this.trip.dateFrom, to: this.trip.dateTo });
    addPlanModal.onDidDismiss(plan => {
      if (plan) {
        // console.log(plan);
        this.trip.itinerary.addPlan(plan);
        this.tripsProvider.update(this.trip.getPartial(['itinerary']));
      }
    })
    addPlanModal.present();
  }
}
