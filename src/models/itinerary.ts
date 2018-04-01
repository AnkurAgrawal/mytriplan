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

  plans: Plan[] = [];

  constructor(plans?: object|Array<object>) {
    // Quick extend/assign plans to this model
    if (plans !== undefined) {
      // console.log(plans as Array<object>);
      plans = !(plans instanceof Array)? plans['plans']: plans;
      (plans as Array<object>).forEach(plan => this.addPlan(plan));
    }
  }

  addPlan(plan: any) {
    if (plan.group) {
      this.plans.push(plan);
    } else {
      Itinerary.getPlanTypes().forEach(planGroup => {
        for (var i = planGroup.types.length - 1; i >= 0; i--) {
          let _plan = planGroup.types[i];
          if (_plan.TYPE == plan.type) {
            delete plan.type;
            this.plans.push(_plan.getInstance(plan));
          }
        }
        // planGroup.types.forEach(plan => {
        //   if (plan.NAME == _plan.group)
        //     this.plans.push(plan.getInstance(plan));
        // })
      });
    }
  }

  getPlans(params?: any) {
    if (!params || (!params.date && !params.dateFrom)) {
      console.log(this.plans);
      return this.plans;
    }
    if (!params.date && params.day && params.dateFrom) {
      params = {date: moment(params.dateFrom).add(+params.day - 1, 'days').format('YYYY-MM-DD')};
    }
    return this.plans.filter((plan) => {
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
    console.log('Updating the plan: ' + oldPlan.type + ' at ' + oldPlan.time + ' on ' + oldPlan.date + '.');
    this.plans[this.plans.indexOf(oldPlan)] = newPlan;
  }

  deletePlan(plan: Plan) {
    this.plans.splice(this.plans.indexOf(plan), 1);
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
