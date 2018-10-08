import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterServiceProvider } from '../../providers/register-service/register-service';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';



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

  
  obj:any={};
  getInfo:any={};

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public registerService: RegisterServiceProvider, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
  this.getInfo = this.registerService.data;
  console.log('data from service in register: ' ,this.getInfo);

  }

  register(){

   if (this.getInfo.length === 0) {
    if(this.obj.username==undefined || this.obj.password==undefined ||this.obj.repass==undefined){
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
    
  if(this.obj.username==undefined || this.obj.password==undefined ||this.obj.repass==undefined){
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
