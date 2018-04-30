import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, Slides, Content } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { PlanFormGeneratorProvider } from '../../providers/providers';
import { IsTypePipe } from '../../pipes/is-type/is-type';
import { MomentPipe } from '../../pipes/moment/moment';
import { FadeInOut } from '../../animations/animations.module';
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
  providers: [
    IsTypePipe,
    MomentPipe
  ],
  animations: [
    FadeInOut
  ]
})
export class TripAddPlanPage {
  @ViewChild('newPlanSlider') newPlanSlides: Slides;
  @ViewChild('content') content: Content;

  private plan: Plan;
  private newPlanForm: FormGroup;
  private grid: boolean;
  private date: string;
  private from: Date | number;
  private to: Date | number;

  planGroups: any;
  unsavedChanges: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public viewCtrl: ViewController, public formBuilder: FormBuilder, private pfg: PlanFormGeneratorProvider, private isType: IsTypePipe, private moment: MomentPipe, private translate: TranslateService) {
    this.date = navParams.get('date');
    this.from = navParams.get('from') || Date.now();
    this.to = navParams.get('to') || Date.now();

    this.planGroups = Itinerary.getPlanTypes();
    this.newPlanForm = this.formBuilder.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      address: ['', Validators.required],
      note: ['']
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
    if (this.unsavedChanges) {
      this.presentDiscard(() => this.viewCtrl.dismiss());
    } else {
      this.viewCtrl.dismiss();
    }
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
    if (this.date) {
      this.plan.date = this.date;
    }

    let databaseDateFormat = 'YYYY-MM-DD';
    this.translate.get('DATABASE_DATE_FORMAT').subscribe((value) => databaseDateFormat = value);

    // Object.keys(this.plan).forEach(key => {
    //   console.log(key + "(" + typeof this.plan[key] + "): " + JSON.stringify(this.plan[key]));
    // });

    this.newPlanForm = this.pfg.create(this.plan);
    // console.log(this.newPlanForm.controls);
    // Object.keys(this.newPlanForm.controls).forEach(key => {
    //   console.log(key + "(" + typeof this.newPlanForm.controls[key] + "): " + this.newPlanForm.controls[key]);
    // });
    this.newPlanForm.valueChanges.subscribe((value) => {
      this.unsavedChanges = true;

      // console.log(value);
      Object.keys(value).forEach(key => {
        if ((typeof value[key]) == 'object') {
          Object.keys(value[key]).forEach(k => {
            let v = value[key][k];
            if (this.isType.transform(k, 'date')) {
              v = this.moment.transform(v, databaseDateFormat);
            }
            this.plan[key][k] = v;
          });
        } else {
          let v = value[key];
          if (this.isType.transform(key, 'date')) {
            v = this.moment.transform(v, databaseDateFormat);
          }
          this.plan[key] = v;
        }
      });
      // console.log(this.plan);
    });

    this.newPlanSlides.slideNext();
  }

  planSelected() {
    this.content.scrollToTop();
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
}
