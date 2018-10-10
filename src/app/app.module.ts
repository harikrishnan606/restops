import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpClientModule }    from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SamplePage } from '../pages/sample/sample';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { Tab1Page } from '../pages/tab1/tab1';
import { Tab2Page } from '../pages/tab2/tab2';
import { MenuPage } from '../pages/menu/menu';



import { RegisterServiceProvider } from '../providers/register-service/register-service'

import { FormsModule }   from '@angular/forms';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SamplePage,
    LoginPage,
    RegisterPage,
    Tab2Page,
    Tab1Page,
    MenuPage

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
   FormsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
    ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SamplePage,
    LoginPage,
    RegisterPage,
    Tab2Page,
    Tab1Page,
    MenuPage,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RegisterServiceProvider
  ]
})
export class AppModule {}
