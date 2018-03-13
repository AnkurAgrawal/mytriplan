import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Platform, ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { CalendarModal, CalendarModalOptions, CalendarResult } from 'ion2-calendar';
import moment from 'moment';

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

  constructor(private platform: Platform, private modalCtrl: ModalController, private translate: TranslateService) { }

  ngOnInit() {
    ;
  }

  x() {
    console.log('Input event');
  }

  openCalendar(ev: any, field: string, f?: string) {
    let title = '';
    this.translate.get('DATE_CALENDAR_TITLE').subscribe((value) => title = value);
    let displayDateFormat = 'MMM DD, YYYY';
    this.translate.get('DISPLAY_DATE_FORMAT').subscribe((value) => displayDateFormat = value);

    const options: CalendarModalOptions = {
      title: title,
      closeLabel: 'Cancel',
      doneLabel: 'Done',
      closeIcon: this.platform.is('android'),
      doneIcon: this.platform.is('android'),
      defaultDate: ev.target.value? ev.target.value: Date.now(),
      defaultScrollTo: ev.target.value? ev.target.value: Date.now()
    };
    console.log(ev.target.value? ev.target.value: Date.now());

    let calendar = this.modalCtrl.create(CalendarModal, {
      options: options
    });
    calendar.present();

    calendar.onDidDismiss((date: CalendarResult, type: string) => {
      if (type.toLowerCase() == 'done' || date) {
        if (f) {
          this.form.controls[field][f].setValue(moment(date.string).format(displayDateFormat));
        } else {
          this.form.controls[field].setValue(moment(date.string).format(displayDateFormat));
        }
      }
    });
  }
}
