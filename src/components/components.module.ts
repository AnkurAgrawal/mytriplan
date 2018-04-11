import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PlanItemSlidingComponent } from './plan-item-sliding/plan-item-sliding';
import { FormComponent } from './form/form';
import { PipesModule } from '../pipes/pipes.module';
import { AddressInputComponent } from './address-input/address-input';
import { DateInputComponent } from './date-input/date-input';
import { PictureInputComponent } from './picture-input/picture-input';

@NgModule({
	declarations: [
    PlanItemSlidingComponent,
    FormComponent,
    AddressInputComponent,
    DateInputComponent,
    PictureInputComponent
  ],
	imports: [
    TranslateModule.forChild(),
    IonicModule,
    PipesModule
  ],
	exports: [
    PlanItemSlidingComponent,
    FormComponent,
    AddressInputComponent,
    DateInputComponent,
    PictureInputComponent
  ]
})
export class ComponentsModule {}
