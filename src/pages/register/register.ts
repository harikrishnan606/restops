import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterServiceProvider } from '../../providers/register-service/register-service';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';

//validation
import {FormBuilder, Validators,FormGroup, AbstractControl} from '@angular/forms';




@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  //model
  username:string;
  password:string;
  repass:string;
  email:string;
  mobno:string;
  
  obj:any={};
  getInfo:any={};

  //validation
  Username: AbstractControl;
  Password: AbstractControl;
  Repass: AbstractControl;
  Email: AbstractControl;
  Mobno: AbstractControl;

  registerform : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder : FormBuilder, 
    public registerService: RegisterServiceProvider, private alertCtrl: AlertController) {

      this.registerform = formBuilder.group({
        Username      : ['',Validators.compose([
                            Validators.required,
                            Validators.maxLength(12),
                            Validators.minLength(5),
                            Validators.pattern('[a-zA-Z]*'),//only for charachters
                           ])],
        Password      : ['', Validators.compose([
                             Validators.required,
                             Validators.maxLength(12),
                             Validators.minLength(6),
                             Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
                          ])],
        Repass      : ['', Validators.required],
        Email      : ['', Validators.compose([
                          Validators.required,
                          Validators.pattern('.+\@.+\..+')])],
        Mobno      : ['', Validators.compose([
                          Validators.required,
                          Validators.maxLength(10),
                          Validators.minLength(10),
                          Validators.pattern('[0-9]*'), //only for numbers
                          ])],
     
      });
      this.Username = this.registerform.controls['Username'];
      this.Password = this.registerform.controls['Password'];
      this.Repass = this.registerform.controls['Repass'];
      this.Email = this.registerform.controls['Email'];
      this.Mobno = this.registerform.controls['Mobno'];
  }

  ionViewDidLoad() {
  this.getInfo = this.registerService.data;
  console.log('data from service in register: ' ,this.getInfo);

  }

  register(){

   if (this.getInfo.length === 0) {
    if(this.obj.username==undefined || this.obj.password==undefined ||this.obj.repass==undefined
      ||this.obj.email==undefined ||this.obj.mobno==undefined){
      let alert = this.alertCtrl.create({
            title: 'Alert',
            subTitle: 'please fill the all fields',
            buttons: ['Ok']
          }); alert.present();
        }
        else {
          if(this.obj.password === this.obj.repass){
            this.registerService.register(this.obj);
            console.log('info :' ,this.obj)
            this.obj={};
            this.navCtrl.push(LoginPage); 
          }
          else {
            let alert = this.alertCtrl.create({
              title: 'Alert',
              subTitle: 'please confirm your password',
              buttons: ['Ok']
            }); alert.present();
          }
        }

   }
   else {
    
  if(this.obj.username==undefined || this.obj.password==undefined ||this.obj.repass==undefined
    ||this.obj.email==undefined ||this.obj.mobno==undefined){
      let alert = this.alertCtrl.create({
            title: 'Alert',
            subTitle: 'please fill the all fields',
            buttons: ['Ok']
          }); alert.present();
        }
        else { 
    if(this.obj.password === this.obj.repass){
      for(var i=0; i<this.getInfo.length;i++){
        if(this.obj.username === this.getInfo[i].username){
  
          let alert = this.alertCtrl.create({
            title: 'Alert',
            subTitle: 'already found',
            buttons: ['Ok']
          }); alert.present();
          break
        } 
        else {
      this.registerService.register(this.obj);
      console.log('info :' ,this.obj)
      this.obj={};
      this.navCtrl.push(LoginPage); 
        }
      }
    }
    else{
      let alert = this.alertCtrl.create({
        title: 'Alert',
        subTitle: 'please confirm your password',
        buttons: ['Ok']
      }); alert.present();
      
    }
  }
}
  }


 
}
