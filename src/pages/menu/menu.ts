import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';

import { IonicPage, NavController, NavParams,Nav } from 'ionic-angular';
import {Tab1Page} from '../tab1/tab1'
import {Tab2Page} from '../tab2/tab2'

//this for display page components in menu 

export interface PageInterface{
  title:string;
  pageName:string;
  tabComponent?:any;
  index?:number;
  icon:string;

}

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  rootPage = "TabsPage";
  @ViewChild(Nav) nav: Nav;
  tab1root: any;
  tab2root: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tab1root = Tab1Page;
    this.tab2root = Tab2Page;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

 

}
