import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { IonicPage, NavController, ViewController, ModalController } from 'ionic-angular';
import { Slides } from 'ionic-angular';

import { Trip } from '../../models/trip';

@IonicPage()
@Component({
  selector: 'page-trip-create',
  templateUrl: 'trip-create.html'
})
export class TripCreatePage {
  @ViewChild(Slides) slides: Slides;

  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;

  trip: Trip;

  form: FormGroup;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, formBuilder: FormBuilder, public camera: Camera, public modalCtrl: ModalController) {
    this.trip = new Trip([]);
    console.log(JSON.stringify(this.trip));

    this.form = formBuilder.group({
      tripPic: [''],
      name: ['', Validators.required],
      description: [''],
      dateFrom: ['', Validators.required],
      dateTo: ['', Validators.required]
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
      this.trip.name = this.form.controls['name'].value;
      this.trip.description = this.form.controls['description'].value;
      this.trip.tripPic = this.form.controls['tripPic'].value;
      this.trip.dateFrom = this.form.controls['dateFrom'].value;
      this.trip.dateTo = this.form.controls['dateTo'].value;
    });
  }

  ionViewDidLoad() {

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
  done() {
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.trip);
  }

  slideChanging() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);

    if (currentIndex == 1) {
      ;
    }
  }

  dateChanged() {
    // this.form.getRawValue[]
  }

  openAddEntry() {
    let addEntryModal = this.modalCtrl.create('TripAddEntryPage');
    addEntryModal.onDidDismiss(entry => {
      if (entry) {
        console.log(entry);
        this.trip.itinerary.addEntry(entry);
      }
    })
    addEntryModal.present();
  }
}
