import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
// import { ModalController } from 'ionic-angular';
import { HttpClient }    from '@angular/common/http';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  showFlag=true;
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
      console.log('length'+this.newTabs.length)
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
  console.log("tab data" +JSON.stringify(this.newTabs));
    
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
    for (var i=0;i<this.newTabs.length;i++) {
 
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
  this.showRes();
  this.setData();
    }
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
  return new Promise(resolve => {
    this.storage.set(this.storageKey,{"action": this.finalInfo.action, "url":  this.finalInfo.url, 
    "params":this.finalInfo.params,"res": this.finalInfo.response});
    resolve(this.storage.get(this.storageKey));
    });

}

//loadData
loadData(){
  return new Promise(resolve => {
    this.storage.get(this.storageKey).then((data ) => {
      resolve(data);
      console.log("data req=" +data.action+ "    url==" +data.url+ "  params== " +data.params);
      this.finalInfo.action = data.action;
     this.finalInfo.url =data.url;
     this.finalInfo.params.key = data.params;
      this.finalInfo.response = data.response;
    });

  })
  
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

    if(this.showFlag==false){
     this.showFlag=true;
    }else{
      this.showFlag=false;
      console.log('params'+JSON.stringify(this.result))
    }
  }



}
