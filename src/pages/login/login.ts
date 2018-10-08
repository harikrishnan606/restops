import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { RegisterServiceProvider } from '../../providers/register-service/register-service';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  //model
  username:string;
  password:string;

  getObj:any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public registerService: RegisterServiceProvider) {

  }

  ionViewDidLoad() {
    this.getObj=this.registerService.getData();
    console.log('login Info :', this.getObj);
  
  }

  login(){

   for(var i=0; i<this.getObj.length;i++){
    
    if(this.username === this.getObj[i].username && this.password === this.getObj[i].password){
      this.navCtrl.push(HomePage);
      }
   }
  
  
  }

  goRegister(){
    this.navCtrl.push(RegisterPage);
  }
}
