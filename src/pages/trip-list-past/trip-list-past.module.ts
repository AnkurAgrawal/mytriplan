import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { TripListPastPage } from './trip-list-past';

@NgModule({
  declarations: [
    TripListPastPage,
  ],
  imports: [
    IonicPageModule.forChild(TripListPastPage),
    TranslateModule.forChild()
  ],
  exports: [
    TripListPastPage
  ]
})
export class PastTripListPageModule {}
