import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Platform, ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { CalendarModal, CalendarModalOptions, CalendarResult } from 'ion2-calendar';
import { MomentPipe } from '../../pipes/moment/moment';

/**
 * Generated class for the DateInputComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'mytriplan-date',
  templateUrl: 'date-input.html',
  providers: [
    MomentPipe,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true
    }
  ]
})
export class DateInputComponent implements ControlValueAccessor {

  @Output() success = new EventEmitter();
  @Input('calendarTitle') calendarTitle?: string;
  @Input('displayFormat') displayFormat: string;
  @Input('returnFormat') returnFormat: string;
  @Input('from') from: number | Date;
  @Input('to') to: number | Date;
  @Input()
  _value = '';

  constructor(private platform: Platform, private modalCtrl: ModalController, private translate: TranslateService, private moment: MomentPipe) { }

  propagateChange = (_: any) => {};

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = this.moment.transform(val, this.displayFormat);
    this.propagateChange(this._value);
  }

  writeValue(value: any) {
    if (value !== undefined && value !== '') {
      this._value = this.moment.transform(value, this.displayFormat);;
    }
  }

  openCalendar(ev: any) {
    if (this.calendarTitle == undefined || this.calendarTitle == '')
      this.translate.get('DATE_CALENDAR_TITLE').subscribe((value) => this.calendarTitle = value);

    if (this.displayFormat == undefined || this.displayFormat == '')
      this.translate.get('DISPLAY_DATE_FORMAT').subscribe((value) => this.displayFormat = value);

    if (this.returnFormat == undefined || this.returnFormat == '')
      this.translate.get('DATABASE_DATE_FORMAT').subscribe((value) => this.returnFormat = value);

    const options: CalendarModalOptions = {
      from: this.from || new Date(),
      to: this.to || 0,
      title: this.calendarTitle,
      closeLabel: 'Cancel',
      doneLabel: 'Done',
      closeIcon: this.platform.is('android'),
      doneIcon: this.platform.is('android'),
      defaultDate: ev.target.value || this.from || Date.now(),
      defaultScrollTo: ev.target.value || Date.now(),
      showAdjacentMonthDay: true
    };

    let calendar = this.modalCtrl.create(CalendarModal, {
      options: options
    });
    calendar.present();

    calendar.onDidDismiss((date: CalendarResult, type: string) => {
      if (type.toLowerCase() == 'done' || date) {
        this.value = date.string;
        this.success.emit(this.moment.transform(date.string, this.returnFormat));
      }
    });
  }

}
