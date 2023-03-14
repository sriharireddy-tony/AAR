import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
    callCompFunction = new EventEmitter();    
    subsVar: Subscription | undefined;   

  constructor() { }

  callCompFunctionFun() {    
    this.callCompFunction.emit();    
  }

  saveAllFunction = new EventEmitter();
  saveAllMasterData(){
    this.saveAllFunction.emit();
  }
  saveAllvar : Subscription | undefined;

 

//   callPmasterFunction =  new EventEmitter();
//   callmasterFunctiontest(){
//        this.callPmasterFunction.emit();
//   }
//    pmastervar : Subscription | undefined;
//    systemMastervar: Subscription | undefined;
//    paintvar: Subscription | undefined;


  convertTupleToJson(obj:any, tblName: string){
    let filtered: any | undefined;
 
     if(Array.isArray(obj)){
         filtered =obj.map((obj)=>{
             return obj.old[tblName]; 
         });
     }else if(obj.old){
         const arr =[];
         arr.push(obj.old[tblName]);
         return arr;
     }else if(obj.new){
         const arr =[];
         arr.push(obj.new[tblName]);
         return arr;
     }
    
     //console.log(filtered);
     return filtered;
 }
 datavalidate(data: string | null | undefined) {
     //debugger;
     if(data != undefined && data != null && data != "") {
         return data;
     } else {
         return "";
     }
 }

}
