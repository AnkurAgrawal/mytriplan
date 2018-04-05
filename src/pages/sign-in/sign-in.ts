import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User, AuthServiceProvider } from '../../providers/providers';
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html'
})
export class SignInPage {

  // Our translated text strings
  private signInErrorString: string;

  signInForm: FormGroup;
  signInError: string;

  constructor(private navCtrl: NavController, private auth: AuthServiceProvider, public user: User, formBuilder: FormBuilder, public translateService: TranslateService) {
    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.signInErrorString = value;
    });
    this.signInForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  // Attempt to sign in through our User service
  signInWithEmail() {
    let data = this.signInForm.value;
    if (!data.email) {
      return;
    }

    let credentials: {email: string, password: string} = {
      email: data.email,
      password: data.password
    };
    this.auth.signInWithEmail(credentials).then(
      () => this.navCtrl.setRoot(MainPage),
      error => this.signInError = error.message || this.signInErrorString
    );


  }

  signInWithGoogle() {
    this.auth.signInWithGoogle().then(
      () => this.navCtrl.setRoot(MainPage),
      error => console.log(error.message)
    );
  }

  signUp() {
    this.navCtrl.push('SignupPage');
  }
}
