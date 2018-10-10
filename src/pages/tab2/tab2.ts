import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterServiceProvider } from '../../providers/register-service/register-service';



@IonicPage()
@Component({
  selector: 'page-tab2',
  templateUrl: 'tab2.html',
})
export class Tab2Page {
  getCafeInfo:any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public registerService: RegisterServiceProvider) {
  }

  ionViewDidLoad() {
    this.getCafeInfo =this.registerService.cafeData;
    console.log(' cafe data from service in register: ' ,this.getCafeInfo);
    if(this.getCafeInfo.length !=0){
      console.log('heloo page');
    }else{
      console.log('no page');
    }
    console.log('ionViewDidLoad Tab2Page');
  }

}
