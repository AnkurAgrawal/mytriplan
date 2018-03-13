import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, ModalController, ViewController, NavController, NavParams } from 'ionic-angular';
import { PlanFormGeneratorProvider } from '../../providers/providers';

import { Plan } from '../../models/plan';

/**
 * Generated class for the TripViewPlanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trip-view-plan',
  templateUrl: 'trip-view-plan.html',
})
export class TripViewPlanPage {

  form: FormGroup;
  plan: Plan;

  updated: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController, formBuilder: FormBuilder, private pfg: PlanFormGeneratorProvider) {
    this.plan = navParams.get('plan') as Plan;

    this.form = this.pfg.create(this.plan);
    this.form.valueChanges.subscribe((value) => {
      this.updated = true;

      Object.keys(value).forEach(key => {
        if ((typeof value[key]) == 'object') {
          Object.keys(value[key]).forEach(k =>
            this.plan[key][k] = value[key][k]
          );
        } else {
          this.plan[key] = value[key];
        }
      });
      console.log(this.plan);
    });
  }

  ionViewDidLoad() {
    console.log('TripViewPlanPage: '+ JSON.stringify(this.plan));
  }

  type(obj): string {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  }

  /**
   * The user is done and wants to update the plan, so return it
   * back to the presenter.
   */
  update() {
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.plan);
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

}
