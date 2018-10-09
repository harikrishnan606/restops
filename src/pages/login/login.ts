import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { RegisterServiceProvider } from '../../providers/register-service/register-service';
import { HomePage } from '../home/home';

//for validations
import {FormBuilder, Validators,FormGroup, AbstractControl, FormControl} from '@angular/forms';
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
   validation_messages:any={}

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public registerService: RegisterServiceProvider,public formBuilder : FormBuilder ) {

    this.loginform = formBuilder.group({
      Username      : new FormControl('', Validators.compose([
                    Validators.required,
                    Validators.maxLength(12),
                    Validators.minLength(5),
                    Validators.pattern('[a-zA-Z]*'),])),
      Password      : ['', Validators.required]
		
    });
    this.Username = this.loginform.controls['Username'];
    this.Password = this.loginform.controls['Password'];


   this.validation_messages={
      'Username': {
      'required':'You must enter a username.',
       'minlength':'Minimum 5 characters are required for username.',
       'maxlength':'You can enter a username of maximum 12 characters.',
      'pattern':'Username should be composed of letters only.'
      
      
     
      }
     }
    }
  ionViewDidLoad() {
    this.getObj=this.registerService.getData();
    console.log('login Info :', this.getObj);
  
  }

  login(){
    if (this.loginform.valid) {
   for(var i=0; i<this.getObj.length;i++){
    
    if(this.username === this.getObj[i].username && this.password === this.getObj[i].password){
      console.log('if')
      this.navCtrl.push(HomePage);
      }
   }
  }
  
  
  }

  goRegister(){
    this.navCtrl.push(RegisterPage);
  }
}
