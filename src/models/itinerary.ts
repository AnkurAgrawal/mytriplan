/**
 * The Itineraries service manages creating instances of Itinerary, so go ahead and rename
 * that something that fits your app as well.
 */

import { Plan } from '../models/plan';
import { Travel } from '../models/travel';
import { Activity } from '../models/activity';
import { Miscellaneous } from '../models/miscellaneous';
import * as models from '../models/models';

export class Itinerary {

  private _plans: Plan[] = [];

  constructor(entries: any) {
    // Quick and dirty extend/assign _plans to this model
    if (entries != undefined) {
      for (let f in entries) {
        this.addPlan(entries[f]);
      }
      // console.log("All entries in current trips: " + JSON.stringify(this._plans));
    }
  }

  addPlan(_plan: any) {
    Itinerary.getPlanTypes().forEach(planGroup =>
      planGroup.types.forEach(plan => {
        if (plan.NAME == _plan.group)
          this._plans.push(plan.getInstance(_plan));
      })
    );
    // for (let i = Itinerary.getPlanTypes().length - 1; i >= 0; i--) {
    //   for (let j = Itinerary.getPlanTypes()[i].types.length - 1; j >= 0; j--) {
    //     if (Itinerary.getPlanTypes()[i].types[j].NAME == _plan.group) {
    //       // console.log("Adding plan: " + JSON.stringify(_plan));
    //       this._plans.push(Itinerary.getPlanTypes()[i].types[j].getInstance(_plan));
    //     }
    //   }
    // }
  }

  getPlans() {
    // console.log("Plans: " + JSON.stringify(this._plans));
    return this._plans;
  }

  static getPlanTypes() {
    return [
    {
      'name': Travel.GROUP,
      'icon': Travel.ICON,
      'types': [ models.Flight, models.CarRental, models.Taxi, models.Train, models.Cruise, models.Driving ]
    }, {
      'name': Activity.GROUP,
      'icon': Activity.ICON,
      'types': [ models.Lodging, models.Meeting, models.Restaurant, models.Outing, models.Show, models.Shopping ]
    }, {
      'name': Miscellaneous.GROUP,
      'icon': Miscellaneous.ICON,
      'types': [ models.Note, models.Todo ]
    }];
  }

}
