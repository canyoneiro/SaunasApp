import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { NFC } from '@ionic-native/nfc';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpClientModule } from '@angular/common/http';

import { CompruebaPage } from '../pages/comprueba/comprueba';

import { ToastController } from 'ionic-angular';
import { BrowserProvider } from '../providers/browser/browser';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CompruebaPage,
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CompruebaPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ToastController,
    NFC,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BrowserProvider    
  ]
})
export class AppModule {}
