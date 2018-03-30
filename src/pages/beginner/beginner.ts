import { MainPage } from '../MainPage/mainpage';
import { Component,ViewChild } from '@angular/core';
import { NavController,AlertController, MenuController,NavParams } from 'ionic-angular';
import {Http,Headers,RequestOptions } from '@angular/http';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage';
import { HomePage } from '../home/home';

@Component({
  selector: 'begin-page',
  templateUrl: 'beginner.html'
})

export class BeginPage {
  public Time:number=3;

  constructor(public navCtrl: NavController,public alertCtrl:AlertController,private http : Http,menuCtrl:MenuController,
    public navParams: NavParams,private nativeStorage: NativeStorage) {

  }
}
