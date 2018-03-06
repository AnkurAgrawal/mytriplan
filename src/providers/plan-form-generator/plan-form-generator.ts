import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { FormGeneratorProvider } from '../form-generator/form-generator';
import { Plan } from '../../models/plan';

/*
  Generated class for the PlanFormGeneratorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlanFormGeneratorProvider extends FormGeneratorProvider<Plan> {

  constructor(formBuilder: FormBuilder) {
    super({
      formBuilder: formBuilder,
      schema: () => ({
        // date: ['', Validators.required],
        // time: ['', Validators.required],
        // address: ['', Validators.required]
      })
    });
  }

}
