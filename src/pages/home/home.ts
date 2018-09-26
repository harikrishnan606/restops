import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
// import { ModalController } from 'ionic-angular';
import { HttpClient }    from '@angular/common/http';
import { Storage } from '@ionic/storage';

import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Slides) slides: Slides;
  showFlag:any=[];
  showResponseFlag=true;

  newTabs:any =[];
  // getParamsList:any = [{key:"", value:""}];
  data:any =[];
  result:any={};
  response: any = {};

  action:string;
  url:string; 
  paramsCheck:string;
  storageKey:string;
  finalInfo:any={};

  constructor(public navCtrl: NavController,private alertCtrl: AlertController,
    public http: HttpClient,private storage: Storage ) {
      //initial
      this.newTabs = [{}]
      this.showFlag.push(true);
      this.loadData();
      // console.log('length'+this.showFlag)
    }

    slideChange(e){
      console.log('in slide movement' +JSON.stringify(e));
      this.showFlag=true;
      if(e.direction ==2){
        let alert = this.alertCtrl.create({
          title: 'Alert',
          subTitle: 'slide changed to right',
          buttons: ['Ok']
        }); alert.present();
        console.log("slide right");
      }else if(e.direction ==4){
        let alert = this.alertCtrl.create({
          title: 'Alert',


          subTitle: 'slide changed to left',
          buttons: ['Ok']
        }); alert.present();
        console.log("slide left");
      }
     
    }
  
addTab(){
  this.newTabs.push({});
  this.showFlag.push(true);
  console.log("tab data" +JSON.stringify(this.newTabs));
  this.goToPage1(this.newTabs.length-1)
    
}
removeTab(index){

  if(this.newTabs.length<=1){
    this.newTabs.splice(index,0);
  }else {
    this.newTabs.splice(index,1);
  }
}
saveData(id){
  // this.newTabs.action;
  // this.newTabs.url;
  if (this.newTabs[id].params !== undefined) {
      for (var i=0; i<this.newTabs[id].params.length; i++) {
    this.result[this.newTabs[id].params[i].key]= this.newTabs[id].params[i].value;
    console.log('res'+JSON.stringify(this.result))
    }

  }
    for (let i=0;i<this.newTabs.length;i++) {
 
  if(this.newTabs[i].action==="get"){
    this.getData(i);
  }

  else if(this.newTabs[i].action==="post"){
    console.log("post");
    this.postData(i);
  }
  else if(this.newTabs[i].action==="delete"){
    console.log("delete");
    this.deleteData(i);
  }  
  else if(this.newTabs[i].action==="patch"){
    console.log("patch");
    this.updateData(i);
  }  
  this.setData();
 
    }
}

goToPage1(id){
  // let currentIndex = this.slides.getActiveIndex();
  // console.log('Current index is', currentIndex);
  this.slides.slideTo(id, 500);
  console.log('goto'+id)
  // this.newTabs = window.localStorage.getItem("storageKey")

}

//get data
getData(id){
  console.log('get')
  this.http.get(this.newTabs[id].url, {params: this.result})
  .subscribe((data:any) => {
    this.newTabs[id].response = JSON.stringify(data);
    if (this.response) { 
      this.result={};
      console.log('final get ='+JSON.stringify(this.newTabs))
    }
    this.showRes();

  });
}
//post data
postData(id){
  this.http.post(this.newTabs[id].url, {params: this.result})
    .subscribe((data:any) => {
      this.newTabs[id].response=JSON.stringify(data);
      if (this.response) { 
        this.result={};
        console.log('final post'+JSON.stringify(this.newTabs));

      }
     }, error => {
      console.log(error);
    });
}

//delete data
deleteData(id){
  this.http.delete(this.newTabs[id].url,{params: this.result})
    .subscribe((data:any) => {
      this.newTabs[id].response=JSON.stringify(data);
      console.log('final delete'+JSON.stringify(this.newTabs))
     }, error => {
      console.log(error);
    });
}

//updateData
updateData(id){
  this.http.patch(this.newTabs[id].url,{params: this.result})
  .subscribe((data:any) => {
    this.newTabs[id].response=JSON.stringify(data);
      console.log('final patch'+JSON.stringify(this.newTabs))
    // console.log("status" +data.status);
    // console.log("data" +data.data); // data received by server
    // console.log("hearder" +data.headers);

  })
}

//localstorageset
setData(){
  this.storage.set('storageKey',JSON.stringify(this.newTabs));
  console.log("set data=" +JSON.stringify(this.storageKey));
  }
 

//loadData
loadData(){
  this.storage.get('storageKey').then((val) => {
    console.log('Yourload data ', JSON.parse(val));
    this.newTabs = JSON.parse(val)
  });
}
  addParamsList(id){
    this.newTabs[id].params.push({});
    
  }

  removeParamsList(id,inid){
    if(this.newTabs[id].params.length<=1){
     
      const alert=this.alertCtrl.create({
      title:'Alert',
      subTitle:'Sorry,cannot allow this ',
      buttons:['ok']  
      });
alert.present();
    }else{
      this.newTabs[id].params.splice(inid,1)
    }

  }

  showRes(){
    this.showResponseFlag=false;
  }
  showParams(id){
    this.newTabs[id].params = [{}];

    if(this.showFlag[id]==false){
     this.showFlag[id]=true;
    }else if(this.showFlag[id]==true){
      this.showFlag[id]=false;
      console.log('params'+JSON.stringify(this.result))
    }
  }

}
