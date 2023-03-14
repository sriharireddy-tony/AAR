import { Component, ElementRef, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { EventEmitter } from 'stream';
import { CommonService } from '../services/common.service';
import { Services } from '../services/services';

@Component({
  selector: 'app-parts-summary',
  templateUrl: './parts-summary.component.html',
  styleUrls: ['./parts-summary.component.css'],
})
export class PartsSummaryComponent implements OnInit {

  display = true;
    @ViewChildren("slider") slider: QueryList<any> | undefined;

  sample =70;
  totalLength:number =0;
  page = 1;
  variantCount:number =0;
  constructor(private services: Services,private commonService: CommonService) {
   }

  ngOnInit(): void {


    if (this.commonService.subsVar==undefined) {    
      this.commonService.callCompFunction.subscribe(() => {    
        this.savePartSummary();    
      });    
    }
    this.getPartsSummaryData();
    this.getAARLOVData();
  }
  call(){
    setTimeout(() => {
    let elements:any = this.slider?.toArray();
    elements.forEach((d:any,i:number)=>{
      let statusVal = this.partsSummaryData[i].AAR_OVERALL_STATUS;
      elements[i].el.nativeElement.querySelector('.p-slider-handle').innerHTML=`<p style='position:absolute;top:0px;font-size:11px;left:2px'>
      ${this.datavalidate(statusVal)==''?'0':statusVal}%<p>`
    })
  }, 0);
  }
  partsSummaryPagination(e:number) {
    this.page = e;
  }
  partsSummaryData: any = [];
  AARLOVData: any =[]
  getPartsSummaryData() {
    this.services.invokeService("GetAARPartSummaryDetails", null, "http://schemas.cordys.com/AARWSAppServerPackage", false, false)
    .then((res: any) => {
      this.partsSummaryData = res;
      this.totalLength = res.length
      this.call();
    })
  }
  getAARLOVData() {
    let obj ={'lmf_type':'VARIANTS'}
    this.services.invokeService("GetAARLovMasterDetailsByLmfType", obj, "http://schemas.cordys.com/AARWSAppServerPackage", false, false)
    .then((res: any) => {
      res.forEach((d:any)=>{
        this.AARLOVData.push(d.LMF_DESC);
      })
      this.variantCount = this.AARLOVData.length;
    })
  }
  
  savePartSummary(){
    alert("called")
      let detailsParamTuple: {}[] = [];
      var AARDetailsparams = {};
      for (var save of this.partsSummaryData) {
        if (this.datavalidate(save.DCR_END_DOC_REF_NO)!= "") {
          AARDetailsparams = {
            'old': {
              'AAR_DETAILS': {
                'AAR_REF_NO': save.AAR_REF_NO
              }
            },
            'new': {
              'AAR_DETAILS': {
                'AAR_PLATFORM': save.AAR_PLATFORM,
                'AAR_PARTNAME': save.AAR_PARTNAME,
                'AAR_COLOR': save.AAR_COLOR,
                "AAR_GRAIN_COLOR": save.AAR_GRAIN_COLOR,
                "AAR_GLOSS_COLOR": save.AAR_GLOSS_COLOR,
                "AAR_DIGITAL_STATUS": save.AAR_DIGITAL_STATUS
              }
            }
          }
        }
        detailsParamTuple.push(AARDetailsparams);
      }
      var detailsparamsAll = { 'tuple': detailsParamTuple };
      // this.services.invokeService("UpdateAarDetails", detailsparamsAll,"http://schemas.cordys.com/AARWSAppServerPackage", true, false)
      //   .then((res: any) => {

      //   })
}
variantsArrSplit(){
  this.partsSummaryData.forEach((d:any)=>{

  })
}
saveVariants(){
  let variantsParamTuple: {}[] = [];
  var AARVariantsparams ={};
  AARVariantsparams = {
    'new': {
      'AAR_DETAILS': {
        'AAR_REF_NO': "",
        // 'HIGH_3_VALUE': save.HIGH_3_VALUE,
        // 'LOW_1_VALUE': save.LOW_1_VALUE,
        // 'HIGH_O__4_VALUE': save.HIGH_O__4_VALUE,
        // "MID_2_VALUE": save.MID_2_VALUE
      }
    }
  };
  this.services.invokeService("UpdateAarVariants", null,"http://schemas.cordys.com/AARWSAppServerPackage", true, false)
        .then((res: any) => {

        })
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
