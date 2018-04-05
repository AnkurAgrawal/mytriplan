import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User, AuthServiceProvider } from '../../providers/providers';
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  signUpForm: FormGroup;
  signupError: string;

  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController, private auth: AuthServiceProvider, formBuilder: FormBuilder, public translateService: TranslateService,
    public user: User) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    });

    this.signUpForm = formBuilder.group({
      photoUrl: [''],
      name: [''],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  signUp() {
    let data = this.signUpForm.value;

    let credentials = {
      photoUrl: data.photoUrl || '',
      displayName: data.name || '' ,
      email: data.email,
      password: data.password
    };
    this.auth.signUp(credentials).then(
      () => this.navCtrl.setRoot(MainPage),
      error => this.signupError = error.message || this.signupErrorString
    );
  }
}
