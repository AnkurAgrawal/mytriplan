import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { TripAddPlanPage } from './trip-add-plan';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    TripAddPlanPage
  ],
  imports: [
    IonicPageModule.forChild(TripAddPlanPage),
    TranslateModule.forChild(),
    PipesModule
  ],
  exports: [
    TripAddPlanPage
  ]
})
export class TripAddPlanPageModule {}
