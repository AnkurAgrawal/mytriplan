import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PlanItemSlidingComponent } from './plan-item-sliding/plan-item-sliding';
import { TripItineraryComponent } from './trip-itinerary/trip-itinerary';
import { FormComponent } from './form/form';
import { PipesModule } from '../pipes/pipes.module';
import { AddressInputComponent } from './address-input/address-input';

@NgModule({
	declarations: [PlanItemSlidingComponent,
    TripItineraryComponent,
    FormComponent,
    AddressInputComponent],
	imports: [
    TranslateModule.forChild(),
    IonicModule,
    PipesModule
  ],
	exports: [PlanItemSlidingComponent,
    TripItineraryComponent,
    FormComponent,
    AddressInputComponent]
})
export class ComponentsModule {}
