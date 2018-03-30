import { Component,ViewChild } from '@angular/core';
import { Platform,Nav,AlertController,Events} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
//import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { NativeStorage } from '@ionic-native/native-storage';
import { HomePage } from '../pages/home/home';
import { MainPage } from '../pages/MainPage/mainpage';
import { RegisterPage } from '../pages/Register/register';
import { BeginPage } from '../pages/beginner/beginner';
import {ReminderPage} from '../pages/Reminder/reminder'
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  logoutAlert:any;
public currentUser:any={};
public firstChar:string;


//  private articleMenuArray = [];
pages:Array<{title:string,Component:any}>;
  @ViewChild(Nav) nav:Nav;
  constructor(platform: Platform,public alertCtrl: AlertController,public nativeStorage: NativeStorage, statusBar: StatusBar,keyboard:Keyboard,public events: Events/*, splashScreen: SplashScreen*/) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
     // statusBar.styleDefault();
     // splashScreen.hide();

  //    this.setupArticleMenuSubscribe();
  //`` keyboard.disableScroll(true);

});

    this.pages = [
         {title:'SignUp',Component:HomePage},
         {title: 'Register',Component:RegisterPage},
         //{title: 'Logout', component: null}
         ];
         this.events.subscribe("userloggedin", (user) => {
    this.currentUser = user;
    this.firstChar=this.currentUser.firstName.charAt(0);

});
if(this.currentUser===null || typeof this.currentUser === "undefined" || typeof this.currentUser==="object"){
this.nativeStorage.getItem('loginDetail')
  .then(
    data => {
      this.currentUser = data
      this.firstChar=this.currentUser.firstName.charAt(0);
    },
    error => console.log(error)
  );
}

  }
  logout(){

    let basicalert = this.alertCtrl.create({
         message: "Are you Sure , you want to logout ?",
         buttons: [{text: "Yes", handler: () => {
          // this.logout();
           this.nativeStorage.remove('login')
           .then(
             data => {
                 this.nav.setRoot(HomePage);
           },
             error =>{
             }
           );
         }}, {text:"No", role: "cancel"}]
       });
       basicalert.present();

//  debugger;
  }
  reminder()
  {
    debugger;
    this.nav.setRoot(ReminderPage);
  }
/*  setupArticleMenuSubscribe(){
    console.log('setupArticleMenuSubscribe');
  // sub scribe to the populate event of the menu
    events.subscribe('articleMenu:populate', articleArray => {
      articleMenuArray = articleArray;
    });
  }

  articleMenuChange(index){
  // notify any observers that an option has been clicked in the menu
    events.publish('articleMenu:change', index);
  }*/
  openPage(page)
  {
    if(page.Component){
    this.nav.setRoot(page.Component);
  }else {
        // Since the component is null, this is the logout option
        // ...

        this.nativeStorage.remove('login')
        .then(
          data => {
            this.nav.push(HomePage).then(() => {
                              const index = this.nav.getActive().index;
                              this.nav.remove(0, index);
          });
        },
          error =>{

          }
        );

        // logout logic
        // ...

        // redirect to home
      //  this.nav.setRoot(HomePage);
    }

}

}
