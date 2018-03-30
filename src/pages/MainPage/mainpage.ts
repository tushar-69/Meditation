import { Component,ViewChild } from '@angular/core';
import { NavController,AlertController, MenuController,NavParams } from 'ionic-angular';
import {Http,Headers,RequestOptions } from '@angular/http';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage';
import { HomePage } from '../home/home';
import { BeginPage } from '../beginner/beginner';



@Component({
  selector: 'page-mainpage',
  templateUrl: 'mainpage.html'
})
export class MainPage {

public firstParam;
  public secondParam;
  public thought;
  public url;
  public dates:any=[];

    constructor(public navCtrl: NavController,public alertCtrl:AlertController,private http : Http,menuCtrl:MenuController,public navParams: NavParams,private nativeStorage: NativeStorage) {
        this.url = navParams.get("url");
        this.firstParam = navParams.get("email");
        this.secondParam = navParams;

        for(let i=1;i<=10;i++){
          this.dates.push(i);
        }
        this.thoughts();
    //	this.articles = ['article 1', 'article 2', 'article 3', 'article 4', 'article 5'];
	   }


/*	ionViewDidLoad() {

			this.events.publish('articleMenu:populate', this.articles);

			this.events.subscribe('articleMenu:change', (index) => {this.showArticle(index);});

			this.menuCtrl.enable(true, 'ArticleMenu');
	}

	ionViewWillUnload(){
	    	// disable the menu when you leave this page
	   this.menuCtrl.enable(false, 'ArticleMenu');
	}
	showArticle(index){
	    // do something with the article here, e.g. display it
	   console.log('Show article:', this.article[index]);
	    }*/

      logout() {
        this.nativeStorage.remove('login')
        .then(
          data => {
            this.navCtrl.push(HomePage).then(() => {
                              const index = this.navCtrl.getActive().index;
                              this.navCtrl.remove(0, index);
          });
        },
          error =>{

          }
        );
       }

       thoughts() {
          this.http.get('http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=6').pipe(
            map(res => res.json())
          ).subscribe(response => {
            this.thought = response[0].content;
            //this.thought = response[0].content.subString(this.thought.indexOf('>')+1, this.thought.lastIndexOf('<'));
            console.log(this.thought);
          },
          err => {
            console.log(" thoughts error");
          });
       }

       begin() {
         this.navCtrl.push(BeginPage);
         console.log("begin page");
       }
}
