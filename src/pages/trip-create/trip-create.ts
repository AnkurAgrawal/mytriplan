import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { Platform, IonicPage, ViewController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { CalendarModal, CalendarModalOptions, CalendarResult } from 'ion2-calendar';
import { MomentPipe } from '../../pipes/moment/moment';
import moment from 'moment';

import { Trip } from '../../models/trip';

@IonicPage()
@Component({
  selector: 'page-trip-create',
  templateUrl: 'trip-create.html',
  providers: [
    MomentPipe
  ]
})
export class TripCreatePage {
  @ViewChild('fileInput') fileInput;

  mode: string;
  trip: Trip;
  form: FormGroup;
  private displayDateFormat: string = 'MMM DD, YYYY';
  unsavedChanges: boolean = false;

  constructor(private platform: Platform, public viewCtrl: ViewController, private alertCtrl: AlertController, private navParams: NavParams, formBuilder: FormBuilder, public camera: Camera, public modalCtrl: ModalController, private translate: TranslateService, private moment: MomentPipe) {
    this.mode = (this.navParams.get('mode')) || 'create';
    this.trip = (this.navParams.get('trip') as Trip) || new Trip();

    this.form = formBuilder.group({
      tripPic: [''],
      name: ['', Validators.required],
      description: [''],
      destination: ['', Validators.required],
      dateFrom: ['', Validators.required],
      dateTo: ['', Validators.required]
    });

    this.form.patchValue(this.trip);

    this.translate.get('DISPLAY_DATE_FORMAT').subscribe((value) => this.displayDateFormat = value);

    // Watch the form for changes
    this.form.valueChanges.subscribe((value) => this.unsavedChanges = true);
  }

  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 375,
        targetHeight: 341
      }).then((data) => {
        this.form.patchValue({ 'tripPic': 'data:image/jpg;base64,' + data });
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'tripPic': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['tripPic'].value + ')'
  }

  openCalendar() {
    console.log('Opening calendar.');

    let title = '';
    this.translate.get('TRIP_DATE_CALENDAR_TITLE').subscribe((value) => title = value);

    const dateFrom = this.trip.dateFrom? this.trip.dateFrom: Date.now();
    const dateTo = this.trip.dateTo || moment(dateFrom).add(1, 'days').toString();
    const options: CalendarModalOptions = {
      pickMode: 'range',
      title: title,
      closeLabel: 'Cancel',
      doneLabel: 'Done',
      closeIcon: this.platform.is('android'),
      doneIcon: this.platform.is('android'),
      defaultDateRange: {from: dateFrom, to: dateTo}
    };

    let calendar = this.modalCtrl.create(CalendarModal, {
      options: options
    });
    calendar.present();

    calendar.onDidDismiss((date: { from: CalendarResult; to: CalendarResult }, type: string) => {
      if (type.toLowerCase() == 'done' || date) {
        this.form.controls['dateFrom'].setValue(this.moment.transform(date.from.string, this.displayDateFormat));
        this.form.controls['dateTo'].setValue(this.moment.transform(date.to.string, this.displayDateFormat));
      }
    });
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    if (this.unsavedChanges) {
      this.presentDiscard(() => this.viewCtrl.dismiss());
    } else {
      this.viewCtrl.dismiss();
    }
  }

  /**
   * The user is done and wants to create the trip, so return it
   * back to the presenter.
   */
  save() {
    if (!this.form.valid) { return; }
    this.saveChanges();
    this.mode == 'create'? this.viewCtrl.dismiss(this.trip): this.viewCtrl.dismiss(true);
  }

  presentDiscard(discardCallback) {
    let discard = this.alertCtrl.create({
      subTitle: 'Discard changes?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Canceled');
          }
        },
        {
          text: 'Discard',
          handler: () => {
            console.log('Discarded');
            discardCallback();
          }
        }
      ]
    });
    discard.present();
  }

  saveChanges() {
    let databaseDateFormat = 'YYYY-MM-DD';
    this.translate.get('DATABASE_DATE_FORMAT').subscribe((value) => databaseDateFormat = value);

    this.trip.name = this.form.controls['name'].value;
    this.trip.description = this.form.controls['description'].value;
    this.trip.tripPic = this.form.controls['tripPic'].value;
    this.trip.destination = this.form.controls['destination'].value;
    this.trip.dateFrom = this.moment.transform(this.form.controls['dateFrom'].value, databaseDateFormat);
    this.trip.dateTo = this.moment.transform(this.form.controls['dateTo'].value, databaseDateFormat);
  }

}
