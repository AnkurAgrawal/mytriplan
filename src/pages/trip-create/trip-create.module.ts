import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';

import { TripCreatePage } from './trip-create';

@NgModule({
  declarations: [
    TripCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(TripCreatePage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
  exports: [
    TripCreatePage
  ]
})
export class TripCreatePageModule { }
