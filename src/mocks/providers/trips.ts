import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Trip } from '../../models/trip';
import { Itinerary } from '../../models/itinerary';

@Injectable()
export class Trips {
  trips: Trip[] = [];

  constructor(public http: Http) {
    let trips = [
      {
        "user": {
          "name": "Jane Doe"
        },
        "name": "Trip to Montreal",
        "description": "",
        "tripPic": "assets/img/trips/lion.jpg",
        "destination": "Montreal, QC, Canada",
        "dateFrom": "2018-10-09",
        "dateTo": "2018-10-19",
        "itinerary": [
          {
            "group": "flight",
            "departureAirport" : {
              "date": "2018-10-09",
              "time": "16:00",
              "address": "Portland, OR, USA"
            },
            "arrivalAirport" : {
              "date": "2018-10-09",
              "time": "22:00",
              "address": "Montreal, QC, Canada"
            }
          },
          {
            "group": "car-rental",
            "company": "Hertz",
            "pickUp": {
              "date": "2018-10-09",
              "time": "03:00",
              "address": "Portland, OR"
            }
          },
          {
            "group": "lodging",
            "nameOfThePlace": "Marriott",
            "address": "Portland, OR",
            "checkIn": {
              "date": "2018-10-10",
              "time": "04:00",
            },
          },
          {
            "group": "restaurant",
            "date": "2018-10-11",
            "startTime": "05:00",
            "address": "Portland, OR",
            "endTime": "06:00"
          }
        ]
      },
      {
        "user": {
          "name": "Charlie Cheetah"
        },
        "name": "Trip to Portland",
        "description": "",
        "tripPic": "assets/img/trips/portland-oregon.jpg",
        "destination": "Portland, OR, USA",
        "dateFrom": "2018-10-09",
        "dateTo": "2018-10-19",
        "itinerary": {}
      },
      {
        "user": {
          "name": "Donald Duck"
        },
        "name": "Trip to Portland",
        "description": "",
        "tripPic": "assets/img/trips/kitten.jpg",
        "dateFrom": "2018-10-09",
        "dateTo": "2018-10-19",
        "itinerary": {}
      },
      {
        "user": {
          "name": "Eva Eagle"
        },
        "name": "Trip to Portland",
        "description": "",
        "tripPic": "assets/img/trips/rabbit.jpg",
        "dateFrom": "2018-10-09",
        "dateTo": "2018-10-19",
        "itinerary": {}
      },
      {
        "user": {
          "name": "Ellie Elephant"
        },
        "name": "Trip to Portland",
        "description": "",
        "tripPic": "assets/img/trips/bear.jpg",
        "dateFrom": "2018-10-09",
        "dateTo": "2018-10-19",
        "itinerary": {}
      },
      {
        "user": {
          "name": "Molly Mouse"
        },
        "name": "Trip to Portland",
        "description": "",
        "tripPic": "assets/img/trips/mouse.jpg",
        "dateFrom": "2018-10-09",
        "dateTo": "2018-10-19",
        "itinerary": {}
      },
      {
        "user": {
          "name": "Paul Puppy"
        },
        "name": "Trip to Portland",
        "description": "",
        "tripPic": "assets/img/trips/puppy.jpg",
        "dateFrom": "2018-10-09",
        "dateTo": "2018-10-19",
        "itinerary": {}
      }
    ];

    for (let trip of trips) {
      this.trips.push(new Trip(trip));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.trips;
    }

    return this.trips.filter((trip) => {
      for (let key in params) {
        let field = trip[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return trip;
        } else if (field == params[key]) {
          return trip;
        }
      }
      return null;
    });
  }

  queryItinerary(params?: any) {
    if (!params) {
      return this.trips[0].itinerary.getPlans();
    }
    return this.trips[0].itinerary.getPlans().filter((plan) => {
      // console.log(JSON.stringify(plan));
      for (let key in params) {
        let field = plan[key];
        if ((typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) || (field == params[key])) {
          return plan;
        }
      }
      return null;
    });
  }

  add(trip: Trip) {
    this.trips.push(trip);
  }

  delete(trip: Trip) {
    this.trips.splice(this.trips.indexOf(trip), 1);
  }

  update(newTrip: Trip, oldTrip: Trip) {
    this.trips.splice(this.trips.indexOf(oldTrip), 1, newTrip);
  }

}
