/**
 * The Itineraries service manages creating instances of Itinerary, so go ahead and rename
 * that something that fits your app as well.
 */
import moment from 'moment';

import { Plan } from '../models/plan';
import { Travel } from '../models/travel';
import { Activity } from '../models/activity';
import { Miscellaneous } from '../models/miscellaneous';
import * as models from '../models/models';

export class Itinerary {

  private _plans: Plan[] = [];

  constructor(entries?: any) {
    // Quick and dirty extend/assign _plans to this model
    if (entries != undefined) {
      for (let f in entries) {
        this.addPlan(entries[f]);
      }
    }
  }

  addPlan(_plan: any) {
    if (_plan.name) {
      this._plans.push(_plan);
    } else {
      Itinerary.getPlanTypes().forEach(planGroup => {
        for (var i = planGroup.types.length - 1; i >= 0; i--) {
          let plan = planGroup.types[i];
          if (plan.NAME == _plan.group)
            this._plans.push(plan.getInstance(_plan));
        }
        // planGroup.types.forEach(plan => {
        //   if (plan.NAME == _plan.group)
        //     this._plans.push(plan.getInstance(_plan));
        // })
      });
    }
  }

  getPlans(params?: any) {
    if (!params || (!params.date && !params.dateFrom)) {
      return this._plans;
    }
    if (!params.date && params.day && params.dateFrom) {
      params = {date: moment(params.dateFrom).add(+params.day - 1, 'days').format('YYYY-MM-DD')};
    }
    return this._plans.filter((plan) => {
      for (let key in params) {
        let field = plan[key];
        if ((typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) || (field == params[key])) {
          return plan;
        }
      }
      return null;
    });
  }

  updatePlan(newPlan: Plan, oldPlan: Plan) {
    console.log('Updating the plan: ' + oldPlan.name + ' at ' + oldPlan.time + ' on ' + oldPlan.date + '.');
    // TODO Update the plan
  }

  deletePlan(plan: Plan) {
    this._plans.splice(this._plans.indexOf(plan), 1);
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
