import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform, Menu, Loading, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Subject } from 'rxjs/Subject';
import { User } from 'firebase/app';

import { MainPage, SignInPage, WelcomePage, TutorialPage } from '../pages/pages';
import { Settings, AuthServiceProvider } from '../providers/providers';

@Component({
  templateUrl: 'app.component.html'
})
export class MyApp {
  rootPage = WelcomePage;

  @ViewChild(Nav) nav: Nav;
  @ViewChild(Menu) menu: Menu;

  pages: {title: string, component: string}[] = [
    { title: 'My trips', component: MainPage },
    { title: 'Maps', component: 'MapPage' },
    { title: 'Cards', component: 'CardsPage' },
    { title: 'Settings', component: 'SettingsPage' }
  ]

  loading: Loading;
  private ngUnsubscribe: Subject<User> = new Subject<User>();

  constructor(private translate: TranslateService, private platform: Platform, private loadingCtrl: LoadingController, private auth: AuthServiceProvider, settings: Settings, private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen, private storage: Storage) {
    this.initTranslate();

    this.platform.ready().then(() => {
      this.storage.get('tutorial-done').then((result) => {

        if (result) {
          this.auth.afAuth.authState
          .takeUntil(this.ngUnsubscribe)
          .subscribe(user => {
            user? this.rootPage = MainPage: this.rootPage = WelcomePage;
            this.ngUnsubscribe.next();
            this.ngUnsubscribe.complete();
          });
        } else {
          this.storage.set('tutorial-done', true);
          this.rootPage = TutorialPage;
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

  signIn() {
    this.menu.close();
    this.auth.signOut();
    this.nav.setRoot(SignInPage);
  }

  signOut() {
    this.menu.close();
    this.auth.signOut().then(() => {
      this.loading.dismiss().then(() => {
        this.nav.setRoot(WelcomePage)
      });
    });
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }
}
