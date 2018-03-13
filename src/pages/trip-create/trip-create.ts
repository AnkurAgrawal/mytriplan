import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { Platform, IonicPage, NavController, ViewController, ModalController, Slides } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { FadeInOut } from '../../animations/animations.module';
import { CalendarModal, CalendarModalOptions, CalendarResult } from 'ion2-calendar';
import moment from 'moment';

import { Trip } from '../../models/trip';
import { Plan } from '../../models/plan';

@IonicPage()
@Component({
  selector: 'page-trip-create',
  templateUrl: 'trip-create.html',
  animations: [
    FadeInOut
  ]
})
export class TripCreatePage {
  @ViewChild('createTripSlider') newTripSlides: Slides;

  @ViewChild('fileInput') fileInput;

  trip: Trip;
  form: FormGroup;
  itinerary: string;

  constructor(private platform: Platform, public navCtrl: NavController, public viewCtrl: ViewController, formBuilder: FormBuilder, public camera: Camera, public modalCtrl: ModalController, private translate: TranslateService) {
    this.trip = new Trip();

    this.form = formBuilder.group({
      tripPic: [''],
      name: ['', Validators.required],
      description: [''],
      destination: ['', Validators.required],
      dateFrom: ['', Validators.required],
      dateTo: ['', Validators.required]
    });

    let databaseDateFormat = 'YYYY-MM-DD';
    this.translate.get('DATABASE_DATE_FORMAT').subscribe((value) => databaseDateFormat = value);

    // Watch the form for changes, and update the corresponding object values
    this.form.controls['name'].valueChanges.subscribe((value) => this.trip.name = value);
    this.form.controls['description'].valueChanges.subscribe((value) => this.trip.description = value);
    this.form.controls['tripPic'].valueChanges.subscribe((value) => this.trip.tripPic = value);
    this.form.controls['destination'].valueChanges.subscribe((value) => this.trip.destination = value);
    this.form.controls['dateFrom'].valueChanges.subscribe((value) => this.trip.dateFrom = moment(value).format(databaseDateFormat));
    this.form.controls['dateTo'].valueChanges.subscribe((value) => this.trip.dateTo = moment(value).format(databaseDateFormat));
    // this.form.valueChanges.subscribe((value) => {
    //   this.trip.name = this.form.controls['name'].value;
    //   this.trip.description = this.form.controls['description'].value;
    //   this.trip.tripPic = this.form.controls['tripPic'].value;
    //   this.trip.destination = this.form.controls['destination'].value;
    //   this.trip.dateFrom = moment(this.form.controls['dateFrom'].value).format(databaseDateFormat);
    //   this.trip.dateTo = moment(this.form.controls['dateTo'].value).format(databaseDateFormat);
    // });

    this.itinerary = '1';
  }

  ionViewDidLoad() {
    // this.newTripSlides.autoHeight = true;
    // this.newTripSlides.height = 100;
    // this.newTripSlides.lockSwipes(true);
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
    const dateTo = this.trip.dateTo? this.trip.dateTo: moment(dateFrom).add(1, 'days').toString();
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
        this.form.controls['dateFrom'].setValue(moment(date.from.string).format('MMM DD, YYYY'));
        this.form.controls['dateTo'].setValue(moment(date.to.string).format('MMM DD, YYYY'));
      }
    });
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the trip, so return it
   * back to the presenter.
   */
  save() {
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.trip);
  }

  slideChanging() {
    if (this.newTripSlides.getActiveIndex() == 1) {
      ;
    }
  }

  x(data: any) {
    console.log(data);
  }

  openAddPlan() {
    let displayDateFormat = 'MMM DD, YYYY';
    this.translate.get('DISPLAY_DATE_FORMAT').subscribe((value) => displayDateFormat = value);
    // console.log('Opening Add Plan: ' + JSON.stringify(this.trip));

    let addPlanModal = this.modalCtrl.create('TripAddPlanPage');
    addPlanModal.onDidDismiss(plan => {
      if (plan) {
        // console.log(plan);
        this.trip.itinerary.addPlan(plan);
        // console.log('Received the plan: ' + JSON.stringify(this.trip));
        if (this.trip.dateFrom == undefined || this.trip.dateFrom == null || this.trip.dateFrom == '' || ((plan as Plan).date && moment((plan as Plan).date).diff(moment(this.trip.dateFrom), 'days') < 0)) {
          this.trip.dateFrom = (plan as Plan).date;
          this.form.controls['dateFrom'].setValue(moment(this.trip.dateFrom).format(displayDateFormat));
        }
        if (this.trip.dateTo == undefined || this.trip.dateTo == null || this.trip.dateTo == '' || ((plan as Plan).date && moment(this.trip.dateTo).diff(moment((plan as Plan).date), 'days') < 0)) {
          this.trip.dateTo = (plan as Plan).date;
          this.form.controls['dateTo'].setValue(moment(this.trip.dateTo).format(displayDateFormat));
        }
        // console.log('Updated trip dates: ' + JSON.stringify(this.trip));
      }
    })
    addPlanModal.present();
  }
}
