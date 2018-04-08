import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ResetPasswordPage } from './reset-password';

@NgModule({
  declarations: [
    ResetPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(ResetPasswordPage),
    TranslateModule.forChild()
  ],
  exports: [
    ResetPasswordPage
  ]
})
export class ResetPasswordPageModule {}
