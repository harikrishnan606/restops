import { HttpClient }    from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class RegisterServiceProvider {


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

}
