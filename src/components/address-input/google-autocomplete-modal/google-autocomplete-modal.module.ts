import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { GoogleAutocompleteModalPage } from './google-autocomplete-modal';

@NgModule({
  declarations: [
    GoogleAutocompleteModalPage,
  ],
  imports: [
    IonicPageModule.forChild(GoogleAutocompleteModalPage),
    TranslateModule.forChild(),
  ],
  exports: [
    GoogleAutocompleteModalPage
  ]
})
export class GoogleAutocompleteModalPageModule { }
