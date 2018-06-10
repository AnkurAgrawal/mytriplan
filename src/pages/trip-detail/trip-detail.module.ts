import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

import { TripDetailPage } from './trip-detail';

@NgModule({
  declarations: [
    TripDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(TripDetailPage),
    TranslateModule.forChild(),
    ComponentsModule,
    PipesModule
  ],
  exports: [
    TripDetailPage
  ]
})
export class TripDetailPageModule { }
