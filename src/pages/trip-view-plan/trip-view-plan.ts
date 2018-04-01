import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, ModalController, ViewController, AlertController, NavController, NavParams } from 'ionic-angular';
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
  private from: Date | number;
  private to: Date | number;

  unsavedChanges: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public viewCtrl: ViewController, public modalCtrl: ModalController, formBuilder: FormBuilder, private pfg: PlanFormGeneratorProvider) {
    this.plan = navParams.get('plan') as Plan;
    this.from = navParams.get('from');
    this.to = navParams.get('to');

    this.form = this.pfg.create(this.plan);
    this.form.valueChanges.subscribe((value) => this.unsavedChanges = true);
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
    this.saveChanges();
    this.viewCtrl.dismiss(true);
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    if (this.unsavedChanges) {
      this.presentDiscard(() => this.viewCtrl.dismiss());
    } else {
      this.viewCtrl.dismiss();
    }
  }

  presentDiscard(discardCallback) {
    let discard = this.alertCtrl.create({
      subTitle: 'Discard changes?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Canceled')
          }
        },
        {
          text: 'Discard',
          handler: () => {
            console.log('Discarded');
            discardCallback();
          }
        }
      ]
    });
    discard.present();
  }

  saveChanges() {
    let values = this.form.value;
    Object.keys(values).forEach(key => {
      if ((typeof values[key]) == 'object') {
        Object.keys(values[key]).forEach(k =>
          this.plan[key][k] = values[key][k]
        );
      } else {
        this.plan[key] = values[key];
      }
    });
    // console.log(this.plan);
  }

}
