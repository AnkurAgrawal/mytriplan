import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { PlanTripPage } from './plan-trip';

@NgModule({
  declarations: [
    PlanTripPage,
  ],
  imports: [
    IonicPageModule.forChild(PlanTripPage),
    TranslateModule.forChild()
  ],
  exports: [
    PlanTripPage
  ]
})
export class PlanTripPageModule { }
