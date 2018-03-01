import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { TripAddEntryPage } from './trip-add-entry';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    TripAddEntryPage
  ],
  imports: [
    IonicPageModule.forChild(TripAddEntryPage),
    TranslateModule.forChild(),
    PipesModule
  ],
  exports: [
    TripAddEntryPage
  ]
})
export class TripAddEntryPageModule {}
