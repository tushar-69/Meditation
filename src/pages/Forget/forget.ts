import { Component } from '@angular/core';
import { NavController,AlertController,LoadingController ,ToastController } from 'ionic-angular';
import {Http,Headers,RequestOptions } from '@angular/http';
import {map} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HomePage } from '../home/home';




@Component({
  selector: 'page-forget',
  templateUrl: 'forget.html'
})
export class ForgetPage  {


	public formforget:FormGroup;
    private isFormSubmitted:boolean=false;

    constructor(public navCtrl: NavController,public alertCtrl:AlertController,private http : Http,public formBuilder:FormBuilder,public loadingCtrl: LoadingController,private toastCtrl: ToastController) {

	}
    ngOnInit() {
      this.formforget = this.formBuilder.group({
      email: ['',[Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]]
    });
   }

   get email() {
     return this.formforget.get('email');
	}

	forgot()
  {

  this.isFormSubmitted=true
  	if(!this.formforget.valid)
  	{
      if(this.formforget.controls.email.errors!==null){
        if(this.formforget.controls.email.errors.hasOwnProperty("required")===true){
      this.showToast("Please enter email");
    }else if (this.formforget.controls.email.errors.hasOwnProperty("pattern")===true){
      this.showToast("Please enter valid email");
        }
      }
      return;
  	}else{
      let loading = this.loadingCtrl.create({
    content: 'Sending link to registered email address...',
    spinner:'ios'
  });

  loading.present();
  			this.isFormSubmitted=false;
            let headers = new Headers();

		 headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers : headers  });

 this.http.post('https://meditationnodeapi.herokuapp.com/forgot', this.formforget.value,options).pipe(
              map(res => res.json())
          ).subscribe(response => {
             console.log('POST Response:', response);
                 loading.dismiss();
                 this.presentToast();

                 this.navCtrl.push(HomePage).then(() => {
                 const index = this.navCtrl.getActive().index;
                 this.navCtrl.remove(0, index);
              });

          },      err => {
                 loading.dismiss();
                 this.showBasicAlert();
      });
      }
	}
  showBasicAlert() {
    let basicAlert = this.alertCtrl.create({
      title: 'Unauthorized',
      subTitle: 'Please Enter registered emailID ',
      buttons: ['OK']
    });
    basicAlert.present();
  }

  presentToast() {
  let toast = this.toastCtrl.create({
    message: 'Please Check Your Email Address to reset password',
    duration: 3000,
    position: 'center'
  });

  toast.present();
	}

  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1000,
      position: 'center'
    });
        toast.present();

  }
}
