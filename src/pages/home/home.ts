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

  getParamsList:any = [{key:"", value:""}];
  data:any =[];
  result:any={};
  response: any = {};

  action:string;
  url:string; 
  storageKey:string;
  constructor(public navCtrl: NavController,private alertCtrl: AlertController,
    public http: HttpClient,private storage: Storage ) {
  }

 
saveData(){
  this.action;
  this.url;
      for (var i=0; i<this.getParamsList.length; i++) {
    this.result[this.getParamsList[i].key]= this.getParamsList[i].value;
    // console.log("result= " +JSON.stringify(this.result));

    }
 
  if(this.action==="get"){
    this.getData();
  }
  else if(this.action==="post"){
    console.log("post");
    this.postData();
  }
  else if(this.action==="delete"){
    console.log("delete");
    this.deleteData();
  }  
  else if(this.action==="patch"){
    console.log("patch");
    this.updateData();
  }  
  this.showRes();
  this.setData();
  
}

//get data
getData(){
  this.http.get(this.url, {params: this.result})
  .subscribe((data:any) => {
    this.response = JSON.stringify(data);
    if (this.response) { 
      this.result={};
    }
    console.log("status" +data.status);
    console.log("data" +data.data); // data received by server
    console.log("hearder" +data.headers);

  })
}
//post data
postData(){
  this.http.post(this.url, this.result)
    .subscribe((data:any) => {
      this.response=JSON.stringify(data);
      console.log("dtaaaa" +data);
      // if (this.response) { 
      //   this.result={};
      // }
     }, error => {
      console.log(error);
    });
}

//delete data
deleteData(){
  this.http.delete(this.url, {params: this.result})
    .subscribe((data:any) => {
      this.response=JSON.stringify(data);
      console.log("delete =" +data);
     }, error => {
      console.log(error);
    });
}

//updateData
updateData(){
  this.http.patch(this.url, {params: this.result})
  .subscribe((data:any) => {
    this.response = JSON.stringify(data);
    console.log("status" +data.status);
    console.log("data" +data.data); // data received by server
    console.log("hearder" +data.headers);

  })
}

//localstorageset
setData(){
  return new Promise(resolve => {
    this.storage.set(this.storageKey,{"action": this.action, "url": this.url, 
    "params": this.getParamsList,"res": this.response});
    resolve(this.storage.get(this.storageKey));
    });

}

//loadData
loadData(){
  return new Promise(resolve => {
    this.storage.get(this.storageKey).then((data ) => {
      resolve(data);
      console.log("data req=" +data.action+ "    url==" +data.url+ "  params== " +data.params);
      this.action = data.action;
     this.url =data.url;
     this.getParamsList.key = data.params;
      this.response = data.response;
    });

  })
  
}

  addParamsList(){
    this.getParamsList.push({key:"", value:""});
    
  }

  removeParamsList(index){
    if(this.getParamsList.length<=1){
      this.getParamsList.splice(index,0);
     
      const alert=this.alertCtrl.create({
      title:'Alert',
      subTitle:'Sorry,cannot allow this ',
      buttons:['ok']  
      });
alert.present();
    }else{
      this.getParamsList.splice(index,1)
    }

  }

  showRes(){
    this.showResponseFlag=false;
  }
  showParams(){
    if(this.showFlag==false){
      this.showFlag=true;
    }else{
      this.showFlag=false;
    }
  }



}
