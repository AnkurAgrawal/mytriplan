import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

/**
 * Generated class for the FormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'mytriplan-form',
  templateUrl: 'form.html'
})
export class FormComponent {

  @Input('form') form: FormGroup;
  @Input('from') from: Date | number;
  @Input('to') to: Date | number;
  @Input('readonly') readonly: boolean;

  constructor() { }

  handleDate(ev: any, field: string, f?: string) {
  }
}
