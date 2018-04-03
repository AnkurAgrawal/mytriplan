import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { TripListPage } from './trip-list';

@NgModule({
  declarations: [
    TripListPage,
  ],
  imports: [
    IonicPageModule.forChild(TripListPage),
    TranslateModule.forChild()
  ],
  exports: [
    TripListPage
  ]
})
export class TripListPageModule { }
