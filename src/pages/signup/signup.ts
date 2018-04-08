import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, LoadingController, Loading } from 'ionic-angular';
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
  loading: Loading;

  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController, private auth: AuthServiceProvider, formBuilder: FormBuilder, public translateService: TranslateService,
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
      email: data.email,
      password: data.password
    };
    this.auth.signUp(credentials).then(
      () => {
        this.loading.dismiss().then(() => {
          setTimeout(() =>
            this.auth.updateUser({photoURL: data.photoUrl || '', displayName: data.name || ''}),
            500
          );
          this.navCtrl.setRoot(MainPage);
        });
      },
      error => {
        this.loading.dismiss().then(() => {
          this.signupError = error.message || this.signupErrorString
        })
      }
    );
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }
}
