import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PlanItemSlidingComponent } from './plan-item-sliding/plan-item-sliding';
import { TripItineraryComponent } from './trip-itinerary/trip-itinerary';
import { FormComponent } from './form/form';
import { PipesModule } from '../pipes/pipes.module';
import { AddressInputComponent } from './address-input/address-input';
import { DateInputComponent } from './date-input/date-input';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
	declarations: [
    PlanItemSlidingComponent,
    TripItineraryComponent,
    FormComponent,
    AddressInputComponent,
    DateInputComponent
  ],
	imports: [
    TranslateModule.forChild(),
    IonicModule,
    PipesModule,
    DirectivesModule
  ],
	exports: [
    PlanItemSlidingComponent,
    TripItineraryComponent,
    FormComponent,
    AddressInputComponent,
    DateInputComponent
  ]
})
export class ComponentsModule {}
