import { Component, Input, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('note') note: ElementRef;

  @Input('form') form: FormGroup;
  @Input('from') from: Date | number;
  @Input('to') to: Date | number;
  @Input('readonly') readonly: boolean;

  constructor() { }

  handleDate(ev: any, field: string, f?: string) {
  }

  resize() {
    let element = this.note['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
    let scrollHeight = element.scrollHeight;
    element.style.height = scrollHeight + 'px';
    this.note['_elementRef'].nativeElement.style.height = scrollHeight + 'px';
  }
}
