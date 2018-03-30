import { Component } from '@angular/core';
import { NavController,AlertController,LoadingController ,ToastController } from 'ionic-angular';
import {Http,Headers,RequestOptions } from '@angular/http';
import {map} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HomePage} from '../home/home';
import { NativeStorage } from '@ionic-native/native-storage';
//import { IonicStorageModule } from '@ionic/storage';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage  {

   public registerFormData:FormGroup;
     private isFormSubmitted:boolean=false;
       public showPass :boolean= false;
         public type = 'password';


  constructor(public navCtrl: NavController,public alertCtrl:AlertController,private http : Http,public formBuilder:FormBuilder,
    public loadingCtrl: LoadingController,private toastCtrl: ToastController, private nativeStorage: NativeStorage) {

     }
  ngOnInit() {
      this.registerFormData = this.formBuilder.group({

          firstName: ['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
      		lastName: ['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
      		email: ['',[Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      		password: ['',[Validators.required,Validators.maxLength(15)]],
      		mobileNumber: ['',[Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]]
    		});
   		}

    get username() {
     		return this.registerFormData.get('username');
    }
   		get firstName() {
     		return this.registerFormData.get('firstName');
		}
		get lastName() {
     		return this.registerFormData.get('lastName');
		}
	 get country() {
      		return this.registerFormData.get('country');
		 }
		get email() {
     		return this.registerFormData.get('email');
		}
		get password(){
		    return this.registerFormData.get('password');
		}
		get mobileNumber(){
		     		return this.registerFormData.get('mobileNumber');
		}


  SignUp(){
    debugger;
	this.isFormSubmitted=true
  	if(!this.registerFormData.valid)
  	{
      this.checkvalidation(this.registerFormData);
  	}else{
      let loading = this.loadingCtrl.create({
    	          	content: 'Sign Up...',
    				spinner:'ios'
  		});

  			loading.present();
  			this.isFormSubmitted=false;
            let headers = new Headers();
this.registerFormData.value.username=this.registerFormData.value.email;
		 headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers : headers  });
 //this.http.post('http://localhost:5000/register', this.registerFormData.value,options).pipe(
 this.http.post('https://meditationnodeapi.herokuapp.com/register', this.registerFormData.value,options).pipe(
              map(res => res.json())
          ).subscribe(response => {
            loading.dismiss();
             console.log('POST Response:', response);
                if(response.error == "A user with the given username is already registered") {
                  let basicAlert = this.alertCtrl.create({
                    title: 'Unauthorized',
                    subTitle: 'emailId is allready registered',
                    buttons: ['OK']
                  });
                  basicAlert.present();
                }
                else {
                  loading.dismiss();
                  this.presentToast();
                  this.navCtrl.push(HomePage);
                }


          },      err => {
                 loading.dismiss();
                 this.showBasicAlert();
      });
    }
}
    showBasicAlert() {
    // let basicAlert = this.alertCtrl.create({
    //   title: 'Unauthorized',
    //   subTitle: 'emailId is allready registered',
    //   buttons: ['OK']
    // });
    // basicAlert.present();
    this.errorToast();
  }

  checkvalidation(registerFormData){

if(registerFormData.controls.firstName.errors!==null){
  if(registerFormData.controls.firstName.errors.hasOwnProperty("required")===true){
this.showToast("Please enter First Name");
}else if (registerFormData.controls.firstName.errors.hasOwnProperty("pattern")===true){
this.showToast("Please enter valid First Name");
  }
} else if(registerFormData.controls.lastName.errors!==null){
  if(registerFormData.controls.lastName.errors.hasOwnProperty("required")===true){
this.showToast("Please enter Last name");
  }else if (registerFormData.controls.lastName.errors.hasOwnProperty("pattern")===true){
this.showToast("Please enter valid Last Name");
  }
} else if(registerFormData.controls.email.errors!==null){
  if(registerFormData.controls.email.errors.hasOwnProperty("required")===true){
this.showToast("Please enter Email Id");
  }else if (registerFormData.controls.email.errors.hasOwnProperty("pattern")===true){
this.showToast("Please enter valid Email Id");
  }
}else if(registerFormData.controls.mobileNumber.errors!==null){
  if (registerFormData.controls.mobileNumber.errors.hasOwnProperty("pattern")===true){
this.showToast("Please enter valid Mobile Number");
  }
}else if(registerFormData.controls.password.errors!==null){
  if(registerFormData.controls.password.errors.hasOwnProperty("required")===true){
    this.showToast("Please enter password");
  }else if (registerFormData.controls.password.errors.hasOwnProperty("maxlength")===true){
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

  presentToast() {
  let toast = this.toastCtrl.create({
    message: 'Registration Successfull',
    duration: 3000,
    position: 'bottom'
  });

  toast.present();
}
errorToast() {
  let toast = this.toastCtrl.create({
    message: 'Unexpected error',
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

Login() {

  this.navCtrl.push(HomePage).then(() => {
                    const index = this.navCtrl.getActive().index;
                    this.navCtrl.remove(0, index);});

  // const index = this.navCtrl.getActive().index;
  // this.navCtrl.remove(0, index);
  // this.navCtrl.push(HomePage);
}
}
