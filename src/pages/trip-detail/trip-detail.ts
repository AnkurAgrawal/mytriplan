import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { FadeInOut } from '../../animations/animations.module';

import { Trip } from '../../models/trip';
import { Trips } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-trip-detail',
  templateUrl: 'trip-detail.html',
  animations: [
    FadeInOut
  ]
})
export class TripDetailPage {
  trip: Trip;
  itinerary: string;
  private tripDates: any[];

  constructor(public navCtrl: NavController, navParams: NavParams, public modalCtrl: ModalController, public trips: Trips, private translate: TranslateService) {
    this.trip = navParams.get('trip') as Trip;

    this.itinerary = '1';

    this.tripDates = this.trip.dates;
  }

  editTrip() {
    console.log('Editing trip: ' + this.trip.name);
    this.navCtrl.push('TripCreatePage', {
      mode: 'edit',
      trip: this.trip
    });
  }

  openPlan(plan) {
    // console.log("Open: " + JSON.stringify(plan));
    let addModal = this.modalCtrl.create('TripViewPlanPage', {plan: plan, from: this.trip.dateFrom, to: this.trip.dateTo});
    addModal.onDidDismiss(newPlan => {
      // TODO Update plan on the web-service
      // if (newPlan) {
      //   this.trip.updatePlan(newPlan, plan);
      // }
    });
    addModal.present();
  }

  deletePlan(plan) {
    console.log("Delete: " + JSON.stringify(plan));
    this.trip.deletePlan(plan);
  }

  openAddPlan(date: string) {
    let displayDateFormat = 'MMM DD, YYYY';
    this.translate.get('DISPLAY_DATE_FORMAT').subscribe((value) => displayDateFormat = value);
    // console.log('Opening Add Plan: ' + JSON.stringify(this.trip));

    let addPlanModal = this.modalCtrl.create('TripAddPlanPage', { date: date, from: this.trip.dateFrom, to: this.trip.dateTo });
    addPlanModal.onDidDismiss(plan => {
      if (plan) {
        console.log(plan);
        this.trip.itinerary.addPlan(plan);
      }
    })
    addPlanModal.present();
  }
}
