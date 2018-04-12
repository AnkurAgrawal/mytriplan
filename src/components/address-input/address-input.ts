import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ModalController } from 'ionic-angular';

/**
 * Generated class for the AddressInputComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'mytriplan-address',
  templateUrl: 'address-input.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressInputComponent),
      multi: true
    }
  ]
})
export class AddressInputComponent implements ControlValueAccessor {

  @Input('placeholder') placeholder?: string;
  @Input('searchPlaceholder') searchPlaceholder: string;
  @Input('readonly') readonly: boolean;
  @Input()
  _value = '';

  constructor(private modalCtrl: ModalController) {
    this.placeholder = '';
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.propagateChange(this._value);
  }

  writeValue(value: any) {
    if (value !== undefined) {
      this._value = value;
    }
  }

  openGoogleAutocompleteModal(ev: Event) {
    if (this.readonly) {
      ev.stopPropagation();
      return;
    }

    let googleAutocompleteModal = this.modalCtrl.create('GoogleAutocompleteModalPage', {
      searchPlaceholder: this.searchPlaceholder
    });
    googleAutocompleteModal.onDidDismiss(address => {
      if (address) {
        this.value = address;
      }
    });
    googleAutocompleteModal.present();
  }
}
