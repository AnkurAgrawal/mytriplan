import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';

import { TripViewPlanPage } from './trip-view-plan';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    TripViewPlanPage,
  ],
  imports: [
    IonicPageModule.forChild(TripViewPlanPage),
    TranslateModule.forChild(),
    PipesModule,
    ComponentsModule
  ],
  exports: [
    TripViewPlanPage
  ]
})
export class TripViewPlanPageModule {}
