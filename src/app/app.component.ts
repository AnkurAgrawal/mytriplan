import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform, Menu } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MainPage, SignInPage, WelcomePage, TutorialPage } from '../pages/pages';
import { Settings, AuthServiceProvider } from '../providers/providers';

@Component({
  template: `<ion-menu [content]="content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
          {{p.title}}
        </button>

        <ion-list-header *ngIf="auth.getEmail()">{{auth.getEmail()}}</ion-list-header>

        <ion-item (click)="signout()" *ngIf="auth.userLoggedIn">
          <ion-icon name="log-out" item-left></ion-icon>
          Sign out
        </ion-item>

        <ion-item (click)="signin()" *ngIf="!auth.userLoggedIn">
          <ion-icon name="log-in" item-left></ion-icon>
          Sign in
        </ion-item>

      </ion-list>
    </ion-content>

  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = TutorialPage;

  @ViewChild(Nav) nav: Nav;
  @ViewChild(Menu) menu: Menu;

  pages: {title: string, component: string}[] = [
    { title: 'MyTriplan', component: MainPage },
    { title: 'Maps', component: 'MapPage' },
    { title: 'Cards', component: 'CardsPage' },
    { title: 'Settings', component: 'SettingsPage' }
  ]

  constructor(private translate: TranslateService, private platform: Platform, private auth: AuthServiceProvider, settings: Settings, private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen, private storage: Storage) {
    this.initTranslate();

    this.platform.ready().then(() => {
      this.storage.get('tutorial-done').then((result) => {

        if (result) {
          this.auth.userLoggedIn? this.rootPage = MainPage: this.rootPage = WelcomePage;
        } else {
          this.storage.set('tutorial-done', true);
        }
      });
    });

  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');

    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  signin() {
    this.menu.close();
    this.auth.signOut();
    this.nav.setRoot(SignInPage);
  }

  signout() {
    this.menu.close();
    this.auth.signOut().then(() =>
      this.nav.setRoot(WelcomePage)
    );
  }
}
