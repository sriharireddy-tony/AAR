import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Services } from '../services/services';

import Swal from 'sweetalert2';
declare var $: any

 @Component({
  selector: 'app-colour-coding',
  templateUrl: './colour-coding.component.html',
  styleUrls: ['./colour-coding.component.css']
 })
 export class ColourCodingComponent implements OnInit {

  constructor(private services: Services, private fg: FormBuilder) { }

  ngOnInit(): void {
    this.GetColorCodingDropDowmList();
    this.GetColorCodeDataDetails();
    this.GetGrainCodeDataDetails();
  }
  uploadImage() {
    $("#imageUpload").click();
  }
  //fordopdown
  lists: any = [];
  MAJOR_COLORLists: any = [];
  APPLICATION_LOCATIONLists: any = [];
  PAINT_TYPELists: any = [];
  FINISH_TYPELists: any = [];
  DECORATIVE_APPLICATIONLists: any = [];
  MAJOR_GRAIN_TYPESLists: any = [];
  METHODOLOGYLists: any = [];
  SUPPLIERLists: any = [];
  IMAGELists:any=[];
  //forbinding
  majorcolor: any = "";
  applicationlocation: any = '';
  painttype: any = "";
  finishtype: any = "";
  decorativeapplication: any = '';
  colorcodingnumber: any = "";
  majorgraintype: any = "";
  methodology: any = "";
  supplier: any = "";
  graincodenumber: any = "";
  

  //gettingdropdownlists
  GetColorCodingDropDowmList() {
    const params = "";

    this.services.invokeService("GetAARLovMasterDetailsByLmfType", params, "http://schemas.cordys.com/AARWSAppServerPackage", false, false).then((res: any) => {
      this.lists = res;
      this.lists.forEach((element: any) => {
        if (element.LMF_TYPE == "MAJOR_COLOR") {
          this.MAJOR_COLORLists.push(element);
        }
        else if (element.LMF_TYPE == "APPLICATION_LOCATION") {
          this.APPLICATION_LOCATIONLists.push(element);
        }
        else if (element.LMF_TYPE == "PAINT_TYPE") {
          this.PAINT_TYPELists.push(element);
        }
        else if (element.LMF_TYPE == "FINISH_TYPE") {
          this.FINISH_TYPELists.push(element);
        }
        else if (element.LMF_TYPE == "DECORATIVE_APPLICATION") {
          this.DECORATIVE_APPLICATIONLists.push(element);
        }
        else if (element.LMF_TYPE == "MAJOR_GRAIN_TYPES") {
          this.MAJOR_GRAIN_TYPESLists.push(element);
        }
        else if (element.LMF_TYPE == "METHODOLOGY") {
          this.METHODOLOGYLists.push(element);
        }
        else if (element.LMF_TYPE == "SUPPLIER") {
          this.SUPPLIERLists.push(element);
        }
        else if (element.LMF_TYPE == "IMAGE") {
          this.IMAGELists.push(element);
        }

      });
    });

  };
  //reactiveforms
  colorcode:any='';
  isSubmitted:boolean= false;
  Submitted:boolean= false;
  ColorCodeForm = this.fg.group({
    majorcolor: ['',Validators.required],
    applicationlocation: ['',Validators.required],
    painttype: ['',Validators.required],
    finishtype: ['',Validators.required],
    decorativeapplication: ['',Validators.required],
    colorcodingnumber: ['',Validators.required],
    majorgraintype: ['',Validators.required],
    methodology: ['',Validators.required],
    supplier: ['',Validators.required],
    graincodenumber: ['',Validators.required],
    image: ['',Validators.required],

  })


  params: any = {};
  colorcodeswal:any="";
  //setting colorcode data
  SaveColorCodingData() {
    this.isSubmitted = true;
    if(this.ColorCodeForm.controls['majorcolor'].invalid || this.ColorCodeForm.controls['applicationlocation'].invalid ||this.ColorCodeForm.controls['painttype'].invalid || this.ColorCodeForm.controls['finishtype'].invalid ||
    this.ColorCodeForm.controls['decorativeapplication'].invalid || this.ColorCodeForm.controls['colorcodingnumber'].invalid){
      // alert('Please enter all mandatory fields');
      Swal.fire(" ", "Please fill the mandatory fields", 'warning');
      return;
    }

 if(this.colorcode!="")
 {
  this.params = {
    tuple: {
      old: {
        AAR_PAINT_DETAILS: {
          'AAR_PAINT_REF_NO': this.colorcode
        }
      },
      new: {
        AAR_PAINT_DETAILS: {

        'AARP_COLOR_NAME': this.ColorCodeForm.controls['majorcolor'].value,
          'AARP_APPLICABLELOCATION': this.ColorCodeForm.controls['majorcolor'].value,
          'AARP_PAINT_TYPE': this.ColorCodeForm.controls['painttype'].value,
          'AARP_FINISH_TYPE': this.ColorCodeForm.controls['finishtype'].value,
          'AARP_DECOR_APPLICATION': this.ColorCodeForm.controls['decorativeapplication'].value,
          'AARP_NUMBER': this.ColorCodeForm.controls['colorcodingnumber'].value
        }
      }
      }
    }

  }


else{
  this.params = {
    tuple: {
      new: {
        AAR_PAINT_DETAILS: {
          'AARP_COLOR_NAME': this.ColorCodeForm.controls['majorcolor'].value,
          'AARP_APPLICABLELOCATION': this.ColorCodeForm.controls['majorcolor'].value,
          'AARP_PAINT_TYPE': this.ColorCodeForm.controls['painttype'].value,
          'AARP_FINISH_TYPE': this.ColorCodeForm.controls['finishtype'].value,
          'AARP_DECOR_APPLICATION': this.ColorCodeForm.controls['decorativeapplication'].value,
          'AARP_NUMBER': this.ColorCodeForm.controls['colorcodingnumber'].value
        }
      }
    }
  
}
}
;


    // console.log(this.ColorCodeForm);
    this.services.invokeService("UpdateAarPaintDetails", this.params, "http://schemas.cordys.com/AARWSAppServerPackage", false, false).then((res: any) => {
      this.colorcode=res[0].AAR_PAINT_REF_NO;
      this.colorcodeswal=res[0].AARP_COLOR_CODE;
      this.GetColorCodeDataDetails();
      // alert("data saved sucessfully");
     
      Swal.fire(" ","Code Generated"+this.colorcodeswal, 'success');
     

    }).catch((response: any) => {
      // alert(response);
      Swal.fire(" ", response, 'warning');
    });
  }
  //claer the colorcoding
  clearColorCoding() {
    this.colorcode='';
    this.ColorCodeForm.patchValue({

      majorcolor :"",
      applicationlocation : "",
      painttype : "",
      finishtype :"",
      decorativeapplication : "",
      colorcodingnumber : "",
    
     })
    this.isSubmitted=false;
    
  }
  //getting colorcode data
  colorcodeDataList: any = [];
  GetColorCodeDataDetails() {
    const param = "";
    this.services.invokeService("GetAARColorCodeDetails", param, "http://schemas.cordys.com/AARWSAppServerPackage", false, false).then((res: any) => {
      this.colorcodeDataList = res;
    })
  }


  //savingGraincodingdata
  param:any='';
  graincolorcode:any='';
  SaveGrainCodingData() {
    this.isSubmitted=false;
    this.Submitted = true;
    if(this.ColorCodeForm.controls['image'].invalid ||this.ColorCodeForm.controls['majorgraintype'].invalid || this.ColorCodeForm.controls['methodology'].invalid ||this.ColorCodeForm.controls['supplier'].invalid || this.ColorCodeForm.controls['graincodenumber'].invalid  ){
      // alert('Please enter all mandatory fields');
      Swal.fire(" ", "Please fill the mandatory fields", 'warning');
      return;
    }
     if(this.graincolorcode!='')
    {
    this.param = {
      tuple: {
        old: {
          AAR_GRAIN_DETAILS: {
            'AARG_REF_NO': this.graincolorcode
          }
        },
        new: {
          'AAR_GRAIN_DETAILS': {
            'AARG_GRAIN_TYPES': this.ColorCodeForm.controls['majorgraintype'].value,
            'AARG_METHODOLOGY': this.ColorCodeForm.controls['methodology'].value,
            'AARG_SUPPLIER': this.ColorCodeForm.controls['supplier'].value,
            'AARG_NUMBER': this.ColorCodeForm.controls['graincodenumber'].value,
            'AARG_IMAGENAME': this.ColorCodeForm.controls['image'].value,
          }
        }
      }
     }
    }



     else {
     this.param = {
      'tuple': {
        'new': {
          'AAR_GRAIN_DETAILS': {
            'AARG_GRAIN_TYPES': this.ColorCodeForm.controls['majorgraintype'].value,
            'AARG_METHODOLOGY': this.ColorCodeForm.controls['methodology'].value,
            'AARG_SUPPLIER': this.ColorCodeForm.controls['supplier'].value,
            'AARG_NUMBER': this.ColorCodeForm.controls['graincodenumber'].value,
            'AARG_IMAGENAME': this.ColorCodeForm.controls['image'].value,

          }
        }
      }
    
      }
     }
     this.services.invokeService("UpdateAarGrainDetails", this.param, "http://schemas.cordys.com/AARWSAppServerPackage", false, false).then((res: any) => {
      this.graincolorcode=res[0].AARG_REF_NO;
      this.GetGrainCodeDataDetails();
      // alert("saved sucessfully");
      Swal.fire(" ", "saved sucessfully", 'success');

     }).catch((errres: any) => {
      // alert(errres);
      Swal.fire(" ", errres, 'warning');
     })
   }

  //clear
  clearGraincoding() {
  this.ColorCodeForm.patchValue({

  majorgraintype:"",
  methodology:"",
  supplier:"",
  graincodenumber:"",
  image:"",

 })

 this.graincolorcode=''
    this.Submitted= false;
  
  }
  //gettinggradecodingdata
  GraincodeDataList: any = [];
  GetGrainCodeDataDetails() {
    const param = "";
    this.services.invokeService("GetAARGrainColorCodeDetails", param, "http://schemas.cordys.com/AARWSAppServerPackage", false, false).then((res: any) => {
      this.GraincodeDataList = res;
    })
  }
  totalLength: number= 0;
  totalLengthGraincode : number=0;
  page = 1;
  graincodepage=1;
  handlePageChangeforcolorcode(eve: number) {
    this.page = eve;
  }
  handlePageChangeforGraincode(data: number) {
    this.graincodepage = data;
  }
  keyPressNumbers(event:any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      // event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
}
 
