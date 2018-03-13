import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';

import { TripDetailPage } from './trip-detail';

@NgModule({
  declarations: [
    TripDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(TripDetailPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
  exports: [
    TripDetailPage
  ]
})
export class TripDetailPageModule { }
