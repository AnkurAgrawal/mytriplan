import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Trip } from '../../models/trip';

@Injectable()
export class Trips {
  trips: Trip[] = [];

  defaultTrip: any = {
    "user": {
      "name": "Burt Bear"
    },
    "name": "Trip to Portland",
    "description": "",
    "tripPic": "assets/img/speakers/bear.jpg",
    "dateFrom": "10/09/2018",
    "dateTo": "10/19/2018",
    "itinerary": [
      {
        "category": "flight",
        "date": "10/09/2018",
        "timeFrom": "02:00 AM",
        "timeTo": "03:00 AM",
        "address": "Portland, OR"
      },
      {
        "category": "carrental",
        "date": "10/09/2018",
        "timeFrom": "03:00 AM",
        "timeTo": "04:00 AM",
        "address": "Portland, OR"
      },
      {
        "category": "lodging",
        "date": "10/10/2018",
        "timeFrom": "04:00 AM",
        "timeTo": "05:00 AM",
        "address": "Portland, OR"
      },
      {
        "category": "restaurant",
        "date": "10/11/2018",
        "timeFrom": "05:00 AM",
        "timeTo": "06:00 AM",
        "address": "Portland, OR"
      }
    ]
  };


  constructor(public http: Http) {
    let trips = [
      {
        "user": {
          "name": "Burt Bear"
        },
        "name": "Trip to Portland",
        "description": "",
        "tripPic": "assets/img/speakers/bear.jpg",
        "dateFrom": "10/09/2018",
        "dateTo": "10/19/2018",
        "itinerary": [
          {
            "category": "flight",
            "date": "10/09/2018",
            "timeFrom": "02:00 AM",
            "timeTo": "03:00 AM",
            "place": "Portland, OR"
          },
          {
            "category": "carrental",
            "date": "10/09/2018",
            "timeFrom": "03:00 AM",
            "timeTo": "04:00 AM",
            "place": "Portland, OR"
          },
          {
            "category": "lodging",
            "date": "10/10/2018",
            "timeFrom": "04:00 AM",
            "timeTo": "05:00 AM",
            "place": "Portland, OR"
          },
          {
            "category": "restaurant",
            "date": "10/11/2018",
            "timeFrom": "05:00 AM",
            "timeTo": "06:00 AM",
            "place": "Portland, OR"
          }
        ]
      },
      {
        "user": {
          "name": "Charlie Cheetah"
        },
        "name": "Trip to Portland",
        "description": "",
        "tripPic": "assets/img/speakers/cheetah.jpg",
        "dateFrom": "10/09/2018",
        "dateTo": "10/19/2018",
        "itinerary": {}
      },
      {
        "user": {
          "name": "Donald Duck"
        },
        "name": "Trip to Portland",
        "description": "",
        "tripPic": "assets/img/speakers/duck.jpg",
        "dateFrom": "10/09/2018",
        "dateTo": "10/19/2018",
        "itinerary": {}
      },
      {
        "user": {
          "name": "Eva Eagle"
        },
        "name": "Trip to Portland",
        "description": "",
        "tripPic": "assets/img/speakers/eagle.jpg",
        "dateFrom": "10/09/2018",
        "dateTo": "10/19/2018",
        "itinerary": {}
      },
      {
        "user": {
          "name": "Ellie Elephant"
        },
        "name": "Trip to Portland",
        "description": "",
        "tripPic": "assets/img/speakers/elephant.jpg",
        "dateFrom": "10/09/2018",
        "dateTo": "10/19/2018",
        "itinerary": {}
      },
      {
        "user": {
          "name": "Molly Mouse"
        },
        "name": "Trip to Portland",
        "description": "",
        "tripPic": "assets/img/speakers/mouse.jpg",
        "dateFrom": "10/09/2018",
        "dateTo": "10/19/2018",
        "itinerary": {}
      },
      {
        "user": {
          "name": "Paul Puppy"
        },
        "name": "Trip to Portland",
        "description": "",
        "tripPic": "assets/img/speakers/puppy.jpg",
        "dateFrom": "10/09/2018",
        "dateTo": "10/19/2018",
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
      return this.trips[0].itinerary.getEntries();
    }
    return this.trips[0].itinerary.getEntries().filter((entry) => {
      for (let key in params) {
        let field = entry[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return entry;
        } else if (field == params[key]) {
          return entry;
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
}
