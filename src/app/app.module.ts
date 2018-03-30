import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
//import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { NativeStorage } from '@ionic-native/native-storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {RegisterPage} from '../pages/Register/register';
import {ForgetPage} from '../pages/Forget/forget';
import {MainPage} from '../pages/MainPage/mainpage';
import {ReminderPage} from '../pages/Reminder/reminder';
import { SharedprefProvider } from '../providers/sharedpref/sharedpref';
import { BeginPage } from '../pages/beginner/beginner';
import { Facebook } from '@ionic-native/facebook';
import { Keyboard } from '@ionic-native/keyboard';
//import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,
    ForgetPage,
    MainPage,
    BeginPage,
    ReminderPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{scrollPadding: false,
            scrollAssist: true,
            autoFocusAssist: false
          }),
  //  IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,
    ForgetPage,
    MainPage,
    BeginPage,
    ReminderPage
  ],
  providers: [
    StatusBar,
  //  SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SharedprefProvider,
    Facebook,
    Keyboard,
    LocalNotifications,
    NativeStorage,
  ]
})
export class AppModule {}
