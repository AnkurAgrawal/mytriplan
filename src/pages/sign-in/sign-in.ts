import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, Loading, LoadingController } from 'ionic-angular';
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
  loading: Loading;

  constructor(private navCtrl: NavController, private auth: AuthServiceProvider, private loadingCtrl: LoadingController, public user: User, formBuilder: FormBuilder, public translateService: TranslateService) {
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
      () => {
        this.loading.dismiss().then(() => {
          this.navCtrl.setRoot(MainPage)
        });
      },
      error => {
        this.loading.dismiss().then(() => {
          this.signInError = error.message || this.signInErrorString
        });
      }
    );
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }

  signInWithGoogle() {
    this.auth.signInWithGoogle().then(
      () => this.navCtrl.setRoot(MainPage),
      error => console.log(error.message)
    );
  }

  goToSignUp() {
    this.navCtrl.push('SignupPage');
  }

  goToResetPassword() {
    this.navCtrl.push('ResetPasswordPage');
  }
}
