import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { FadeInOut } from '../../animations/animations.module';
import moment from 'moment';

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
  }

  openPlan(plan) {
    // console.log("Open: " + JSON.stringify(plan));
    let addModal = this.modalCtrl.create('TripViewPlanPage', {plan: plan});
    addModal.onDidDismiss(newPlan => {
      if (newPlan) {
        this.trip.updatePlan(newPlan, plan);
      }
    });
    addModal.present();
  }

  deletePlan(plan) {
    console.log("Delete: " + JSON.stringify(plan));
  }

  openAddPlan() {
    let displayDateFormat = 'MMM DD, YYYY';
    this.translate.get('DISPLAY_DATE_FORMAT').subscribe((value) => displayDateFormat = value);
    // console.log('Opening Add Plan: ' + JSON.stringify(this.trip));

    let addPlanModal = this.modalCtrl.create('TripAddPlanPage');
    addPlanModal.onDidDismiss(plan => {
      if (plan) {
        // console.log(plan);
        this.trip.itinerary.addPlan(plan);
        // console.log('Received the plan: ' + JSON.stringify(this.trip));
        if (this.trip.dateFrom == undefined || this.trip.dateFrom == null || this.trip.dateFrom == '' || ((plan as Plan).date && moment((plan as Plan).date).diff(moment(this.trip.dateFrom), 'days') < 0)) {
          this.trip.dateFrom = (plan as Plan).date;
        }
        if (this.trip.dateTo == undefined || this.trip.dateTo == null || this.trip.dateTo == '' || ((plan as Plan).date && moment(this.trip.dateTo).diff(moment((plan as Plan).date), 'days') < 0)) {
          this.trip.dateTo = (plan as Plan).date;
        }
        // console.log('Updated trip dates: ' + JSON.stringify(this.trip));
      }
    })
    addPlanModal.present();
  }
}
