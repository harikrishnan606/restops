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
import {RegisterPage } from '../pages/register/register';

import { RegisterServiceProvider } from '../providers/register-service/register-service'
import { FormsModule }   from '@angular/forms';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SamplePage,
    LoginPage,
    RegisterPage

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
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RegisterServiceProvider
  ]
})
export class AppModule {}
