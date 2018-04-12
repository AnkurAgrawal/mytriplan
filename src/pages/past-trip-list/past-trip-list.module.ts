import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { PastTripListPage } from './past-trip-list';

@NgModule({
  declarations: [
    PastTripListPage,
  ],
  imports: [
    IonicPageModule.forChild(PastTripListPage),
    TranslateModule.forChild()
  ],
  exports: [
    PastTripListPage
  ]
})
export class PastTripListPageModule {}
