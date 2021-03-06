import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
// import { ModalController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { SamplePage } from '../sample/sample';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Slides) slides: Slides;
  showFlag: any = [];
  showResponseFlag: any = [];
  bgColor: any = [];

  newTabs: any = [];
  // getParamsList:any = [{key:"", value:""}];
  data: any = [];
  result: any = {};
  response: any = {};

  action: string;
  url: string;
  storageKey: string;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController,
    public http: HttpClient, private storage: Storage) {
    //initial
    this.newTabs = [{}]
    // this.showFlag.push(true);
    // this.showResponseFlag.push(true);
    // if (this.newTabs[0].url != undefined){
    //   this.loadData();
    // }else{
    //   this.loadData()
    // }
    this.loadData();

  }

  //slide change with alert without using slide property on ionic
  slideChange(e,id) {
    this.loadData();
  }

    // console.log('in slide movement' + JSON.stringify(e));
    // // this.showFlag=true;

    // let currentIndex = this.slides.getActiveIndex();
    // console.log('Current index is', currentIndex);
    // if(currentIndex==id){
    //   this.bgColor[id]=true;
    // }else{
    //   this.bgColor[id]=false;
    // }

    // for (var i = 0; i < this.bgColor.length; i++) {
    //   if(i===id) {
    //  this.bgColor[id]=true;
    //   }
    //   else this.bgColor[i]=false
    // }

//slide alert for left and right
    // if (e.direction == 2) {
    // let alert = this.alertCtrl.create({
    //     title: 'Alert',
    //     subTitle: 'slide changed to right',
    //     buttons: ['Ok']
    //   }); alert.present();
    //   console.log("slide right");
    //   this.loadData();

    // } else if (e.direction == 4) {
    //   let alert = this.alertCtrl.create({
    //     title: 'Alert',
    //     subTitle: 'slide changed to left',
    //     buttons: ['Ok']
    //   }); alert.present();
    //   console.log("slide left");
    
  // }

  addTab() {
    this.newTabs.push({});
    this.bgColor.push(true)
    this.showFlag.push(true);
    console.log("tab data" + JSON.stringify(this.newTabs));
    this.goToPage1(this.newTabs.length - 1)
    this.setData();

  }
  removeTab(index) {
    if (this.newTabs.length <= 1) {
      this.newTabs.splice(index, 0);
    } else {
      this.newTabs.splice(index, 1);
      this.setData();

    }
    this.goToPage1(index - 1)
  }
  saveData(id) {
    // this.newTabs.action;
    // this.newTabs.url;
    if (this.newTabs[id].params !== undefined) {
      for (var i = 0; i < this.newTabs[id].params.length; i++) {
        if (this.newTabs[id].params[i].paramsCheck === true) {
          this.result[this.newTabs[id].params[i].key] = this.newTabs[id].params[i].value;
          console.log('res' + JSON.stringify(this.result))
        }
      }

    }
    // for (let i=0;i<this.newTabs.length;i++) {

    if (this.newTabs[id].action === "get") {
      this.getData(id);
    }
    else if (this.newTabs[id].action === "post") {
      console.log("post");
      this.postData(id);
    }
    else if (this.newTabs[id].action === "delete") {
      console.log("delete");
      this.deleteData(id);
    }
    else if (this.newTabs[id].action === "patch") {
      console.log("patch");
      this.updateData(id);
    }
    this.setData();
    // }
  }

  goToPage1(id) {

    for (var i = 0; i < this.bgColor.length; i++) {
      if (i == id) {
        this.bgColor[i] = true;
      } else {
        this.bgColor[i] = false;
      }
    }
    // let currentIndex = this.slides.getActiveIndex();
    // console.log('Current index is', currentIndex);
    this.slides.slideTo(id, 500);
    console.log('goto page' + id)
    // this.newTabs = window.localStorage.getItem("storageKey")



  }

  //get data
  getData(id) {
    console.log('get')
    this.http.get(this.newTabs[id].url, { params: this.result })
      .subscribe((data: any) => {
        this.newTabs[id].response = JSON.stringify(data);

        if (this.newTabs[id].response) {
          this.setData();
          this.showResponseFlag[id] = false;

          this.result = {};
          console.log('final get =' + JSON.stringify(this.newTabs))
        }
      }, error => {
        console.log(error);
      });
    console.log('invalid', this.newTabs[id].response)
  }
  //post data
  postData(id) {
    this.http.post(this.newTabs[id].url, { params: this.result })
      .subscribe((data: any) => {
        this.newTabs[id].response = JSON.stringify(data);
        if (this.newTabs[id].response) {
          this.result = {};
          this.setData()
          this.showResponseFlag[id] = false;
          console.log('final post' + JSON.stringify(this.newTabs));

        }
      }, error => {
        console.log(error);
      });
  }

  //delete data
  deleteData(id) {
    this.http.delete(this.newTabs[id].url, { params: this.result })
      .subscribe((data: any) => {
        this.newTabs[id].response = JSON.stringify(data);
        if (this.newTabs[id].response) {
          this.setData()
          this.showResponseFlag[id] = false;
          this.result = {}
        }
        console.log('final delete' + JSON.stringify(this.newTabs))
      }, error => {
        console.log(error);
      });
  }

  //updateData
  updateData(id) {
    this.http.patch(this.newTabs[id].url, { params: this.result })
      .subscribe((data: any) => {
        this.newTabs[id].response = JSON.stringify(data);
        if (this.newTabs[id].response) {
          this.setData()
          this.showResponseFlag[id] = false;
          this.result = {}
        }
        console.log('final patch' + JSON.stringify(this.newTabs))
        // console.log("status" +data.status);
        // console.log("data" +data.data); // data received by server
        // console.log("hearder" +data.headers);

      })
  }

  //localstorageset
  setData() {
    this.storage.set('storageKey', JSON.stringify(this.newTabs));
    console.log("set data=" + JSON.stringify(this.storageKey));
  }
  //  clearData(){
  //    this.storage.clear()
  //    this.storage.get('storageKey').then((val) => {
  //     console.log('Yourload data ', JSON.parse(val));
  //    }).catch((err) => {
  //   })
  //  }

  //loadData
  loadData() {

    this.storage.get('storageKey').then((val) => {
      console.log('Yourload data ', JSON.parse(val), +JSON.stringify(this.showFlag));
      this.newTabs = JSON.parse(val)
      console.log("value =" + JSON.parse(val));
      // this.newTabs= [{}];

      let currentIndex = this.slides.getActiveIndex();

      if (val !== null) {
        console.log("loading time =" + this.newTabs[0].url)

        for (var i = 0; i < this.newTabs.length; i++) {
          if(i==currentIndex){
            this.bgColor[i]=true;
          }else{
            this.bgColor[i]=false;
          }

          if (this.newTabs[i].response != undefined) {
            this.showResponseFlag.push(false)
          } else {
            this.showResponseFlag.push(true)

          }
          // if(this.newTabs[i].response !="undefined"){
          //   this.showResponseFlag[i]=false;
          // }

          if (this.newTabs[i].params != undefined) {
            this.showFlag.push(false);
          } else this.showFlag.push(true)
        } console.log('arraay', this.showFlag)
      } else this.newTabs = [{}]
    })
      .catch((err) => {
        console.log('no dataaaaaaaaaaaaaaaa')
      });
  }
  addParamsList(id, inid) {
    this.newTabs[id].params.push({});
    this.newTabs[id].params[inid + 1].paramsCheck = true
  }

  removeParamsList(id, inid) {
    if (this.newTabs[id].params.length <= 1) {

      const alert = this.alertCtrl.create({
        title: 'Alert',
        subTitle: 'Sorry,cannot allow this ',
        buttons: ['ok']
      });
      alert.present();
    } else {
      this.newTabs[id].params.splice(inid, 1)
    }
    this.setData()
  }
  // showRes(id){
  //   this.showResponseFlag[id]=false;
  // }
  showParams(id) {
    this.setData();

    console.log('hghgh' + this.newTabs[id].params)
    if (this.newTabs[id].params === undefined) {
      this.newTabs[id].params = [{}];
      this.newTabs[id].params[0].paramsCheck = true
    }
    if (this.showFlag[id] == false) {
      this.showFlag[id] = true;
    } else if (this.showFlag[id] == true) {
      this.showFlag[id] = false;
      console.log('params' + JSON.stringify(this.result))
    }
    this.setData();
  }

nextPage(){
  this.navCtrl.push(SamplePage);
    console.log('this is views page');
}
}
