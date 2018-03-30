import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController , ToastController,Events  } from 'ionic-angular';
import { Http,Headers,RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx';
import { RegisterPage } from '../Register/register';
import { ForgetPage } from '../Forget/forget';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MainPage } from '../MainPage/mainpage';
//import { IonicStorageModule } from '@ionic/storage';
import { NativeStorage } from '@ionic-native/native-storage';
import {
  Facebook,
  FacebookLoginResponse
}
  from '@ionic-native/facebook';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage  {
      public isLoggedIn:boolean = false;
public users: any;

     public formdata:FormGroup;
     private isFormSubmitted:boolean=false;
     public showPass :boolean= false;
     public type = 'password';
     public resp1;
     public resp3;
     public loadingFb: any;
     public showLogin :boolean= false;

  constructor(public navCtrl: NavController,public alertCtrl:AlertController,private http : Http,public formBuilder:FormBuilder,
    public loadingCtrl: LoadingController,private toastCtrl: ToastController,private fb: Facebook, private nativeStorage: NativeStorage, public events: Events) {

fb.getLoginStatus()
    .then(res => {
      console.log(res.status);
      if(res.status === "connect") {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    })
    .catch(e => console.log(e));
     }
  ngOnInit() {
   this.checkStorageData();
      this.formdata = this.formBuilder.group({
      username: ['',[Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['',[Validators.required,Validators.maxLength(15)]],
    });
   }

get username() {
     return this.formdata.get('username');
}

 get password() {
     return this.formdata.get('password');
}

  SignIn()
  {
  //	console.log('sdssdsdsd');
  //	console.log(this.username.value);
  //	console.log('sdssdsdsd');
  this.isFormSubmitted=true
  	if(!this.formdata.valid)
  	{
      this.checkvalidation(this.formdata);

  	}else{
      let loading = this.loadingCtrl.create({
    content: 'Logging in...',
    spinner:'ios'
  });



  loading.present();
  			this.isFormSubmitted=false;
            let headers = new Headers();

		 headers.append('Content-Type', 'application/json');
  //  headers.append('Access-Control-Allow-Origin','http://localhost:8100');
  	 let options = new RequestOptions({ headers : headers  });
 // let headers = {
 //            'Content-Type': 'application/json'
 //        };
  //    	this.http.post('https://meditationnodeapi.herokuapp.com/login', data,options).pipe(
  //      	    map(res => res.json())
  //      	).subscribe(response => {
  //         	 console.log('POST Response:', response);
  //      	});
  //  	}
 //debugger
 this.http.post('https://meditationnodeapi.herokuapp.com/login', this.formdata.value,options).pipe(
              map(res => res.json())
          ).subscribe(response => {
             console.log('POST Response:', response);
                 loading.dismiss();
                 this.presentToast();
                 //Storage.set('LoginID', 'ID');
                 this.saveDataToStorage(response);
this.events.publish("userloggedin", response);
          },      err => {
                 loading.dismiss();
                 this.showBasicAlert();
      });
      }
	}
	Register(){
this.formdata.reset();
this.navCtrl.push(RegisterPage).then(() => {
                  const index = this.navCtrl.getActive().index;
                  this.navCtrl.remove(0, index);});

// const index = this.navCtrl.getActive().index;
// this.navCtrl.remove(0, index);
// 		  this.navCtrl.push(RegisterPage);
	}

  Forget(){
    this.formdata.reset();
     this.navCtrl.push(ForgetPage);
  }
  showBasicAlert() {
    let basicAlert = this.alertCtrl.create({
      title: 'Unauthorized',
      subTitle: 'This email doesnt seem to have a Meditation account. Mind trying again ?',
      buttons: ['OK']
    });
    basicAlert.present();
  }

  presentToast() {
  let toast = this.toastCtrl.create({
    message: 'User login successfully',
    duration: 3000,
    position: 'bottom'
  });

  toast.present();
}
showPassword() {
    this.showPass = !this.showPass;

    if(this.showPass){
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

  login() {
  this.fb.login(['public_profile', 'user_friends', 'email'])
    .then(res => {
      this.resp1=res;
      if(res.status === "connected") {
       this.loadingFb = this.loadingCtrl.create({
      content: 'Logging in...',
      spinner:'ios'
    });



    this.loadingFb.present();

        this.isLoggedIn = true;
        this.getUserDetail(res.authResponse.userID);
      } else {
        this.isLoggedIn = false;
      }
    })
    .catch(e => console.log('Error logging into Facebook', e));
}
logout() {
  this.fb.logout()
    .then( res => this.isLoggedIn = false)
    .catch(e => console.log('Error logout from Facebook', e));
}
getUserDetail(userid) {
  this.fb.api("/"+userid+"/?fields=id,email,name,picture,gender",["public_profile"])
    .then(res => {
      console.log(res);
      this.users = res;
      this.resp3=res;
      if(res!=null){
        this.registerFB(res);
      }


    })
    .catch(e => {
      console.log(e);
    });
}
checkvalidation(formdata){

if(formdata.controls.username.errors!==null){
  if(formdata.controls.username.errors.hasOwnProperty("required")===true){
this.showToast("Please enter email");
  }else if (formdata.controls.username.errors.hasOwnProperty("pattern")===true){
this.showToast("Please enter valid email");
  }
}else if(formdata.controls.password.errors!==null){
  if(formdata.controls.password.errors.hasOwnProperty("required")===true){
    this.showToast("Please enter password");
  }else if (formdata.controls.password.errors.hasOwnProperty("maxlength")===true){
this.showToast("Please enter password less than 16 digits");
  }
}
}

showToast(message) {
  let toast = this.toastCtrl.create({
    message: message,
    duration: 1000,
    position: 'center'
  });
      toast.present();

}

registerFB(fbData) {
      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      let myParams = new URLSearchParams();
      myParams.append('email',fbData.email);
      let options = new RequestOptions({ headers: myHeaders, params: myParams });
  //    var url = 'https://meditationnodeapi.herokuapp.com/search';
      // $.ajax({
      //
      // })
      // var url = 'http://localhost:5000/search';
      // this.http.get(url,options).pipe(
      //   map(res => res.json())
      // ).subscribe(response => {
      //   console.log(response);

        // if(response == null) {
            let fbUser = {
            username: fbData.name,
            firstName: 'fbDummy',
            lastName: 'fbDummy',
            email: fbData.email,
            country: 'fbDummycountry',
            contact: 'fbDummyContact',
            password: fbData.name
          };
          options = new RequestOptions({ headers: myHeaders });
          this.http.post('https://meditationnodeapi.herokuapp.com/register', fbUser, options).pipe(
                       map(res => res.json())
                   ).subscribe(response => {
                      console.log('POST Response:', response);
                    this.loadingFb.dismiss();
                    this.saveDataToStorage(response);

                    });
      // }
        //this.http.post('https://meditationnodeapi.herokuapp.com/register', fbUser);
      // });
    }

saveDataToStorage(response) {
  this.nativeStorage.setItem('loginDetail', response)
  .then(
    () => console.log('Stored item!'),
    error => console.error('Error storing item', error)
  );


  this.nativeStorage.setItem('login', {success: 'true'})
  .then(
    () =>{ this.navCtrl.push(MainPage).then(() => {
                      const index = this.navCtrl.getActive().index;
                      this.navCtrl.remove(0, index);});},
    error => console.log('Error storing item', error)
  );
}

checkStorageData() {
  this.nativeStorage.getItem('login')
  .then(
    data => {if(data.success === 'true') {
      this.navCtrl.push(MainPage).then(() => {
                        const index = this.navCtrl.getActive().index;
                        this.navCtrl.remove(0, index);
    });}else{
      this.showLogin=true;
    }
  },
    error =>{
      this.showLogin=true;

    }
  );
 }
}
