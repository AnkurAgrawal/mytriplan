import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Slides } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';

import { PlanFormGeneratorProvider } from '../../providers/providers';
import { IsTypePipe } from '../../pipes/is-type/is-type';
import { Itinerary } from '../../models/itinerary';
import { Plan } from '../../models/plan';

/**
 * Generated class for the TripAddPlanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trip-add-plan',
  templateUrl: 'trip-add-plan.html',
  providers: [ IsTypePipe ]
})
export class TripAddPlanPage {
  @ViewChild('newPlanSlider') newPlanSlides: Slides;

  private plan: Plan;
  private newPlanForm: FormGroup;
  private grid: boolean;

  planGroups: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public formBuilder: FormBuilder, private pfg: PlanFormGeneratorProvider, private isType: IsTypePipe, private translate: TranslateService) {
    this.planGroups = Itinerary.getPlanTypes();
    this.newPlanForm = this.formBuilder.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      address: ['', Validators.required]
    });
    // console.log(Object.keys(this.newPlanForm.controls));
    this.grid = true;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad TripAddPlanPage');
    this.newPlanSlides.autoHeight = true;
    this.newPlanSlides.noSwiping = true;
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the trip, so return it
   * back to the presenter.
   */
  done() {
    if (!this.newPlanForm.valid) { return; }
    this.viewCtrl.dismiss(this.plan);
  }

  openNewPlanForm(planType: any) {
    this.plan = planType.getInstance();

    let databaseDateFormat = 'YYYY-MM-DD';
    this.translate.get('DATABASE_DATE_FORMAT').subscribe(
      value => {
        databaseDateFormat = value;
      }
    );

    // Object.keys(this.plan).forEach(key => {
    //   console.log(key + "(" + typeof this.plan[key] + "): " + JSON.stringify(this.plan[key]));
    // });

    this.newPlanForm = this.pfg.create(this.plan);
    // console.log(this.newPlanForm.controls);
    // Object.keys(this.newPlanForm.controls).forEach(key => {
    //   console.log(key + "(" + typeof this.newPlanForm.controls[key] + "): " + this.newPlanForm.controls[key]);
    // });
    this.newPlanForm.valueChanges.subscribe((value) => {
      // console.log(value);
      Object.keys(value).forEach(key => {
        if ((typeof value[key]) == 'object') {
          Object.keys(value[key]).forEach(k => {
            let v = value[key][k];
            if (this.isType.transform(k, 'date')) {
              v = moment(v).format(databaseDateFormat);
            }
            this.plan[key][k] = v;
          });
        } else {
          let v = value[key];
          if (this.isType.transform(key, 'date')) {
            v = moment(v).format(databaseDateFormat);
          }
          this.plan[key] = v;
        }
      });
      // console.log(this.plan);
    });

    this.newPlanSlides.slideNext();
  }

}
