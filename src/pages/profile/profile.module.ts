import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ProfilePage } from './profile';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    TranslateModule.forChild(),
    PipesModule
  ],
  exports: [
    ProfilePage
  ]
})
export class ProfilePageModule {}
