import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TripListOptionsPage } from './trip-list-options';

@NgModule({
  declarations: [
    TripListOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(TripListOptionsPage),
  ],
})
export class TripListOptionsPageModule {}
