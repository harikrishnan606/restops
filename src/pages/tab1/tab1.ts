import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterServiceProvider } from '../../providers/register-service/register-service';
import { Tab2Page } from '../tab2/tab2';



@IonicPage()
@Component({
  selector: 'page-tab1',
  templateUrl: 'tab1.html',
})
export class Tab1Page {

  cafename:string;
  cafedesc:string;

  cafeObj:any={};
  getCafeInfo:any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public registerService: RegisterServiceProvider) {
  }

  ionViewDidLoad() {
  //   this.getCafeInfo=this.registerService.cafeData;
  //  console.log('length ', this.getCafeInfo.length);
    console.log('ionViewDidLoad Tab1Page');
  }

  next(){
    if(this.cafeObj.cafename != undefined && this.cafeObj.cafedesc!= undefined){
      this.navCtrl.push(Tab2Page);
     }
   this.registerService.cafeRegister(this.cafeObj)
   console.log('cafe info :' ,this.cafeObj)


   

  }

}
