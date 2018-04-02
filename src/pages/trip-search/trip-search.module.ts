import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { TripSearchPage } from './trip-search';

@NgModule({
  declarations: [
    TripSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(TripSearchPage),
    TranslateModule.forChild()
  ],
  exports: [
    TripSearchPage
  ]
})
export class TripSearchPageModule { }
