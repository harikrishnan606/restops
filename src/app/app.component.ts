import { Component,ViewChild } from '@angular/core';
import { Platform,Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { LoginPage } from '../pages/login/login';
import { MenuPage } from '../pages/menu/menu';
import { HomePage } from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  splash = true ;
  rootPage:any = MenuPage;
  @ViewChild(Nav) nav:Nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      setTimeout(() => this.splash = false, 1000);
    
    });
  }

  gotoHome(page){
this.nav.setRoot(MenuPage);
  }

  gotoTab(page){
    this.nav.setRoot(HomePage);
      }
}

