import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import moment from 'moment';

import { Trips } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-trip-detail',
  templateUrl: 'trip-detail.html'
})
export class TripDetailPage {
  trip: any;
  itinerary: string;

  constructor(public navCtrl: NavController, navParams: NavParams, public trips: Trips) {
    this.trip = navParams.get('trip') || trips.defaultTrip;

    this.trip.daysLeft = 1 + moment(this.trip.dateFrom).diff(moment(new Date()), 'days');

    this.itinerary = "1";

    this.trip.dates = [];
    this.trip.length = 1 + moment(this.trip.dateTo).diff(moment(this.trip.dateFrom), 'days');
    for (var _i = 0; _i < this.trip.length; _i++) {
      this.trip.dates.push(moment(this.trip.dateFrom).add(_i, 'days'));
    }

    this.changeCurrentDay(this.itinerary);
  }

  changeCurrentDay(day:string) {
    let currentDay = moment(this.trip.dateFrom).add(+day - 1, 'days').format('MM/DD/YYYY');

    this.trip.currentDayItinerary = this.trips.queryItinerary({
      date: currentDay
    });
  }

  openEntry(entry) {
    console.log(entry);
    // this.navCtrl.push('TripDetailPage', {
    //   trip: trip
    // });
  }

}
