import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the MytriplanTripItineraryComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'mytriplan-trip-itinerary',
  templateUrl: 'trip-itinerary.html'
})
export class TripItineraryComponent {

  @Input('dates') dates: any[];

  constructor() {
    console.log('Hello MytriplanTripItineraryComponent Component');
  }

}
