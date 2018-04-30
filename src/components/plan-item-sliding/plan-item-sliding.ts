import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Platform } from 'ionic-angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

import { Plan } from '../../models/plan';
import { Travel } from '../../models/travel';

/**
 * Generated class for the PlanItemSlidingComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'mytriplan-plan-item-sliding',
  templateUrl: 'plan-item-sliding.html'
})
export class PlanItemSlidingComponent {

  @Input('plan') plan: Plan;
  @Output() open = new EventEmitter();
  @Output() delete = new EventEmitter();

  inactive: boolean = false;

  constructor(private launchNavigator: LaunchNavigator, private platform: Platform) { }

  ionViewDidLoad() { }

  openAddressInMap(ev: Event) {
    ev.stopPropagation();
    console.log("Opening location in maps");

    if (this.platform.is('core')) {
      window.open('https://www.google.com/maps/search/?api=1&query=' + this.plan.address, '_system');
    } else {
      let options: LaunchNavigatorOptions = {};
      this.launchNavigator.navigate(this.plan.address, options)
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );
    }
  }

  openRouteInMap(ev: Event) {
    ev.stopPropagation();
    console.log("Opening route in maps");

    if (this.platform.is('core')) {
      window.open('https://www.google.com/maps/dir/?api=1&origin=' + this.plan.address + '&destination=' + (<Travel> this.plan).destinationAddress, '_system');
    } else {
      let options: LaunchNavigatorOptions = {
        start: this.plan.address
      };
      this.launchNavigator.navigate((<Travel> this.plan).destinationAddress, options)
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );
    }
  }
}
