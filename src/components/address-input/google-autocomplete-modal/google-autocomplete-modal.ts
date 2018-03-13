import { Component, ViewChild } from '@angular/core';
import { IonicPage, ViewController, Searchbar } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';

@IonicPage()
@Component({
  selector: 'page-google-autocomplete',
  templateUrl: 'google-autocomplete-modal.html',
  providers: [Keyboard]
})
export class GoogleAutocompleteModalPage {

  @ViewChild(Searchbar) searchbar;

  autocompletePlaces: any;
  autocompleteService;

  constructor(public viewCtrl: ViewController, private keyboard: Keyboard) { }

  ngOnInit() {
    this.autocompleteService = new google.maps.places.AutocompleteService();
    this.autocompletePlaces = [];
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.keyboard.show() // for android
      this.searchbar.setFocus();
    }, 450); //a least 150ms.
  }

  getPlaces(ev: any) {
    // set val to the value of the searchbar
    let value = ev.target.value;

    // if the value is an empty string don't get the predictions
    if (value && value.trim() != '') {
      console.log('Fetching places from Google');
      let self = this;
      let config = {
        input: value
      }
      this.autocompleteService.getPlacePredictions(config, (predictions, status) => {
        if (status == 'OK') {
          self.autocompletePlaces = [];
          predictions.forEach((prediction) => self.autocompletePlaces.push(prediction.description));
        }
      });
    }
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and selected the address from the list, so return it
   * back to the presenter.
   */
  selectAddress(address: string) {
    console.log('Selected address: ' + address);
    this.viewCtrl.dismiss(address);
  }
}