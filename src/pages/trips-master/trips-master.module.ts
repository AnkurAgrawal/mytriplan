import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { TripsMasterPage } from './trips-master';

@NgModule({
  declarations: [
    TripsMasterPage,
  ],
  imports: [
    IonicPageModule.forChild(TripsMasterPage),
    TranslateModule.forChild()
  ],
  exports: [
    TripsMasterPage
  ]
})
export class TripsMasterPageModule { }
