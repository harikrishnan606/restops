import { HttpClient }    from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class RegisterServiceProvider {

  cafeData:any=[];
  data:any=[];
  storageKey: string;


  constructor(public http: HttpClient ) {
  }

  register(obj){
    this.data.push(obj);
    console.log('data :', this.data);
  
  }
  getData(){
    return (this.data);
  }

  //cafe 
  cafeRegister(obj){
    this.cafeData.push(obj);
    console.log('cafe data :', this.cafeData);
  
  }

 
  getCafeData(){
    return (this.cafeData);
  }

}
