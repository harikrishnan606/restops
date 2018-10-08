import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { RegisterServiceProvider } from '../../providers/register-service/register-service';
import { HomePage } from '../home/home';

//for validations
import {FormBuilder, Validators,FormGroup, AbstractControl} from '@angular/forms';
// import { FormsModule }   from '@angular/forms';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  //model
  username:string;
  password:string;
  Username: AbstractControl;
  Password: AbstractControl;

  

  getObj:any=[];


  //validation
   loginform : FormGroup;


  constructor(public navCtrl: NavController, public navParams: NavParams,
  public registerService: RegisterServiceProvider,public formBuilder : FormBuilder ) {

    this.loginform = formBuilder.group({
      Username      : ['', Validators.required],
      Password      : ['', Validators.required]
		
    });
    this.Username = this.loginform.controls['Username'];
    this.Password = this.loginform.controls['Password'];


  

  }

  ionViewDidLoad() {
    this.getObj=this.registerService.getData();
    console.log('login Info :', this.getObj);
  
  }

  login(){

   for(var i=0; i<this.getObj.length;i++){
    
    if(this.username === this.getObj[i].username && this.password === this.getObj[i].password){
      console.log('if')
      this.navCtrl.push(HomePage);
      }
   }
  
  
  }

  goRegister(){
    this.navCtrl.push(RegisterPage);
  }
}
