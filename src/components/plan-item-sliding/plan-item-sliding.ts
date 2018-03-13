import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Plan } from '../../models/plan';

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

  constructor() { }

}
