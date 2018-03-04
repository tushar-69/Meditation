import { Component,ViewChild } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import {Http,Headers,RequestOptions } from '@angular/http';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {HomePage} from '../pages/MainPage/mainpage';

@Component({
  selector: 'page-mainpage',
  templateUrl: 'mainpage.html'
})
export class MainPage {


  
    constructor(public navCtrl: NavController,public alertCtrl:AlertController,private http : Http) {

	}
   
}
