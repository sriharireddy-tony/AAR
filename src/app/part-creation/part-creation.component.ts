import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import Swal from 'sweetalert2';
import { CommonService } from '../services/common.service';
import { Services } from '../services/services';

declare var $:any;

@Component({
  selector: 'app-part-creation',
  templateUrl: './part-creation.component.html',
  styleUrls: ['./part-creation.component.css']
})
export class PartCreationComponent implements OnInit {



  namespace: string = "http://schemas.cordys.com/AARWSAppServerPackage";
  platformDetailsList:any=[];
  projectCodeDetailsList =[];
  systemDetailsList =[];
  variantDetailsList =[];
  stageDetailsList:any =[];
  projectMasterDetailsList:any =[];
  commodityDetailsList:any =[];
  AAR_REF_NO:any;
  variants:string = '';
  saveFlag:boolean = false;
  Tier1LocationList:any = [];
  $scope:any;
  partscopelist:any = [];
  textureSupplierLocationlist:any = [];
  ColorCodeList:any = [];
  GrainColordetailsList:any = [];
  projectdetailsList:any = [];

  dropdownSettings:IDropdownSettings = {};
  keyword = "LMF_DESC"

  constructor(private services: Services,private fg: FormBuilder) { }



  ngOnInit(): void {
    this.getAARLovMasterDetails();
    this.getAARDetails();
    this.getAARProjectMasterDetail();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'LMF_ID',
      textField: 'LMF_DESC',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    }; 
    this.getColorCodedetails();
    this.getGrainColorCodeDetails();
    this. getProjectDetails();
  }
  publishData(){
    
  }
  

  onItemSelect= (item:any) =>
  {
for(let i =0;i<this.variantDetailsList.length;i++)
{
  
}
  }
  onSelectAll= function(item:any)
  {
    
  }
  
  aarDetailsForm = this.fg.group({
    AAR_SECTOR:['',Validators.required],
    AAR_PLATFORM:['',Validators.required],
    AAR_PROJECTCODE:['',Validators.required],
    AAR_VARIANT:['',Validators.required],
    AAR_STAGE:['',Validators.required],
    AAR_COMMODITY:['',Validators.required],
    AAR_PARTNAME:['',Validators.required],
    AAR_PARTNUMBER:['',Validators.required],
    AAR_ENG_MATERIAL_GRADE:['',Validators.required],
    AAR_SYSTEM:['',Validators.required],
    AAR_CLASSA_DESIGNER:['',Validators.required],
    AAR_ENG_REV:['', Validators.required],
    AAR_CMF_DESIGNER:['',Validators.required],
    AAR_PROJECT_MANAGEMENT:['',Validators.required],
    AAR_PLATFORM_HEAD:['',Validators.required],
    AAR_PLATFORM_ENG_HEAD:['',Validators.required],
    AAR_ENG_DESIGN:['',Validators.required],
    AAR_CDMM_CMF:['',Validators.required],
    AAR_TRIM_STA:['',Validators.required],
    AAR_COLOR:['',Validators.required],
    AAR_ENG_GLOSS_DEF:['',Validators.required],
    AAR_ASPECT_COLOR:['',Validators.required],
    AAR_ENG_TIER1:['',Validators.required],
    AAR_ENG_TIER1_LOC:['',Validators.required],
    AAR_ENG_DRAFT_ANALYSIS:['',Validators.required],
    AAR_PHYSICAL_GRAIN_MAPPING:['',Validators.required],
    AAR_ENG_DIGITAL_GRAIN_MAPP:['',Validators.required],
    AAR_TOTAL_KICK_OFF:['',Validators.required],
    AAR_REMARKS:['',Validators.required],
    AAR_STATUS:['',Validators.required],
    AAR_NO_OF_CAVITY:['',Validators.required],
    AAR_CAVITY_VALIDATION_REMARKS:['',Validators.required],
    AAR_GLOSS_COLOR:['',Validators.required],
    AAR_GRAIN_STATUS:['',Validators.required]
  })
  getAARLovMasterDetails()
  {
    let dataObj = {
      
    }
    this.services.invokeService("GetAARLovMasterDetailsByLmfType", dataObj, this.namespace, true, false)
    .then((res: any) => {
      if (res) {
       
        this.variantDetailsList = $.cordys.json.findObjects(res, 'LMF_TYPE', 'VARIANTS');
        this.commodityDetailsList = $.cordys.json.findObjects(res, 'LMF_TYPE', 'COMMODITY');
        this.stageDetailsList = $.cordys.json.findObjects(res, 'LMF_TYPE', 'STAGE');
        this.Tier1LocationList = $.cordys.json.findObjects(res,'LMF_TYPE', 'TIER1LOCATION');
        this.partscopelist = $.cordys.json.findObjects(res,'LMF_TYPE','PARTSCOPE');
        this.textureSupplierLocationlist=$.cordys.json.findObjects(res, 'UM_USER_ROLE', 'SUPPLIER LOCATION')
        // console.log("stageDetailsList", this.stageDetailsList)
        // console.log("commoditylist",this.commodityDetailsList)
        console.log("texturelist",this.textureSupplierLocationlist)
      
  
      }
    });
  }
  getProjectDetails(){
    let data = {

    }
    this.services.invokeService("GetProjectTeamRolesAndUsers", data,this.namespace, true,false)
    .then((res:any) => {
      this.projectdetailsList = res;
      console.log("projectdetails", res);
    })
  }
  aarCMFDetails:any = [];
 
  getAARProjectMasterDetail()
  {
    let dataObj = {
      
    }
    this.services.invokeService("GetAARProjectMasterDetails", dataObj, this.namespace, true, false)
    .then((res: any) => {
      if (res) {
       
        this.projectMasterDetailsList = res;
        console.log("projectmasterdetails", this.projectMasterDetailsList)
       
      }
    });
  }
  getColorCodedetails(){
    {
      let colorobj={

      }
      this.services.invokeService("GetAARColorCodeDetails", colorobj, this.namespace,true, false)
      .then((res:any) => {
        this.ColorCodeList = res;
        console.log("colorcodelist", this.ColorCodeList);
      })
    }
  }
  getGrainColorCodeDetails(){
    
      let grainobj = {

      }
    
    this.services.invokeService("GetAARGrainColorCodeDetails", grainobj, this.namespace,true,false)
    .then((res:any) => {
      this.GrainColordetailsList = res;
      console.log("graindetails", this.GrainColordetailsList);
    })
  }
  getAARDetails()
  {
    let dataObj = {
      
    }
    this.services.invokeService("GetAARDetails", dataObj, this.namespace, true, false)
    .then((res: any) => {
      if (res) {
        if(res.length > 0)
        {
  this.aarDetailsForm.patchValue({
  AAR_SECTOR:res[0].AAR_SECTOR,
  AAR_PLATFORM:res[0].AAR_PLATFORM,
  AAR_STAGE:res[0].AAR_STAGE,
  AAR_PROJECTCODE:res[0].AAR_PROJECTCODE,
  AAR_SYSTEM:res[0].AAR_SYSTEM,
  AAR_VARIANT:res[0].AAR_VARIANT,
  AAR_COMMODITY:res[0].AAR_COMMODITY
})
        }
      }
    })
  }
  saveAARDetails() {
    let params = {};
if(this.validateAARFields())
{
    if(this.datavalidate(this.aarDetailsForm.controls['AAR_VARIANT'].value) != '')
    {
for(let i =0;i<this.aarDetailsForm.controls['AAR_VARIANT'].value.length;i++){
  if(this.datavalidate(this.variants) == '')
  this.variants += this.aarDetailsForm.controls['AAR_VARIANT'].value[i].LMF_ID;
  else
  this.variants = this.variants +","+this.aarDetailsForm.controls['AAR_VARIANT'].value[i].LMF_ID;
}
    }
    if(this.datavalidate(this.AAR_REF_NO) != "")
    {
     params = {
       tuple: {
         old: {
           AAR_DETAILS: {
             'AAR_REF_NO': this.AAR_REF_NO
           }
         },
         new: {
           AAR_DETAILS: {
            'AAR_SECTOR':this.aarDetailsForm.controls['AAR_SECTOR'].value,
             'AAR_PLATFORM':this.aarDetailsForm.controls['AAR_PLATFORM'].value,
             'AAR_PROJECTCODE':this.aarDetailsForm.controls['AAR_PROJECTCODE'].value,
             'AAR_VARIANT': this.aarDetailsForm.controls['AAR_VARIANT'].value,
             'AAR_STAGE': this.aarDetailsForm.controls['AAR_STAGE'].value,
             'AAR_COMMODITY': this.aarDetailsForm.controls['AAR_COMMODITY'].value,
             'AAR_PARTNAME': this.aarDetailsForm.controls['AAR_PARTNAME'].value,
             'AAR_PARTNUMBER': this.aarDetailsForm.controls['AAR_PARTNUMBER'].value,
             'AAR_ENG_MATERIAL_GRADE': this.aarDetailsForm.controls['AAR_ENG_MATERIAL_GRADE'].value,
             'AAR_SYSTEM': this.aarDetailsForm.controls['AAR_SYSTEM'].value,
             'AAR_CLASSA_DESIGNER': this.aarDetailsForm.controls['AAR_CLASSA_DESIGNER'].value,
             'AAR_ENG_REV': this.aarDetailsForm.controls['AAR_ENG_REV'].value,
             'AAR_CMF_DESIGNER': this.aarDetailsForm.controls['AAR_CMF_DESIGNER'].value,
             'AAR_PROJECT_MANAGEMENT': this.aarDetailsForm.controls['AAR_PROJECT_MANAGEMENT'].value,
             'AAR_PLATFORM_HEAD': this.aarDetailsForm.controls['AAR_PLATFORM_HEAD'].value,
             'AAR_PLATFORM_ENG_HEAD': this.aarDetailsForm.controls['AAR_PLATFORM_ENG_HEAD'].value,
             'AAR_ENG_DESIGN': this.aarDetailsForm.controls['AAR_ENG_DESIGN'].value,
             'AAR_CDMM_CMF': this.aarDetailsForm.controls['AAR_CDMM_CMF'].value,
             'AAR_TRIM_STA': this.aarDetailsForm.controls['AAR_TRIM_STA'].value,
             'AAR_COLOR': this.aarDetailsForm.controls['AAR_COLOR'].value,
             'AAR_ENG_GLOSS_DEF': this.aarDetailsForm.controls['AAR_ENG_GLOSS_DEF'].value,
             'AAR_ASPECT_COLOR': this.aarDetailsForm.controls['AAR_ASPECT_COLOR'].value,
             'AAR_ENG_TIER1': this.aarDetailsForm.controls['AAR_ENG_TIER1'].value,
             'AAR_ENG_TIER1_LOC': this.aarDetailsForm.controls['AAR_ENG_TIER1_LOC'].value,
             'AAR_ENG_DRAFT_ANALYSIS': this.aarDetailsForm.controls['AAR_ENG_DRAFT_ANALYSIS'].value,
             'AAR_PHYSICAL_GRAIN_MAPPING': this.aarDetailsForm.controls['AAR_PHYSICAL_GRAIN_MAPPING'].value,
             'AAR_ENG_DIGITAL_GRAIN_MAPP':this.aarDetailsForm.controls['AAR_ENG_DIGITAL_GRAIN_MAPP'].value,
             'AAR_TOTAL_KICK_OFF':this.aarDetailsForm.controls['AAR_TOTAL_KICK_OFF'].value,
             'AAR_REMARKS':this.aarDetailsForm.controls['AAR_REMARKS'].value,
             'AAR_STATUS':this.aarDetailsForm.controls['AAR_STATUS'].value,
             'AAR_NO_OF_CAVITY':this.aarDetailsForm.controls['AAR_NO_OF_CAVITY'].value,
             'AAR_CAVITY_VALIDATION_REMARKS':this.aarDetailsForm.controls['AAR_CAVITY_VALIDATION_REMARKS'].value,
             'AAR_GLOSS_COLOR':this.aarDetailsForm.controls['AAR_GLOSS_COLOR'].value,
             'AAR_GRAIN_STATUS':this.aarDetailsForm.controls['AAR_GRAIN_STATUS'].value
           }
         }
         }
       }
   
     }
   
   
   else{
     params = {
       tuple: {
         new: {
          AAR_DETAILS: {
            'AAR_SECTOR':this.aarDetailsForm.controls['AAR_SECTOR'].value,
             'AAR_PLATFORM':this.aarDetailsForm.controls['AAR_PLATFORM'].value,
             'AAR_PROJECTCODE':this.aarDetailsForm.controls['AAR_PROJECTCODE'].value,
             'AAR_VARIANT': this.aarDetailsForm.controls['AAR_VARIANT'].value,
             'AAR_STAGE': this.aarDetailsForm.controls['AAR_STAGE'].value,
             'AAR_COMMODITY': this.aarDetailsForm.controls['AAR_COMMODITY'].value,
             'AAR_PARTNAME': this.aarDetailsForm.controls['AAR_PARTNAME'].value,
             'AAR_PARTNUMBER': this.aarDetailsForm.controls['AAR_PARTNUMBER'].value,
             'AAR_ENG_MATERIAL_GRADE': this.aarDetailsForm.controls['AAR_ENG_MATERIAL_GRADE'].value,
             'AAR_SYSTEM': this.aarDetailsForm.controls['AAR_SYSTEM'].value,
             'AAR_CLASSA_DESIGNER': this.aarDetailsForm.controls['AAR_CLASSA_DESIGNER'].value,
             'AAR_ENG_REV': this.aarDetailsForm.controls['AAR_ENG_REV'].value,
             'AAR_CMF_DESIGNER': this.aarDetailsForm.controls['AAR_CMF_DESIGNER'].value,
             'AAR_PROJECT_MANAGEMENT': this.aarDetailsForm.controls['AAR_PROJECT_MANAGEMENT'].value,
             'AAR_PLATFORM_HEAD': this.aarDetailsForm.controls['AAR_PLATFORM_HEAD'].value,
             'AAR_PLATFORM_ENG_HEAD': this.aarDetailsForm.controls['AAR_PLATFORM_ENG_HEAD'].value,
             'AAR_ENG_DESIGN': this.aarDetailsForm.controls['AAR_ENG_DESIGN'].value,
             'AAR_CDMM_CMF': this.aarDetailsForm.controls['AAR_CDMM_CMF'].value,
             'AAR_TRIM_STA': this.aarDetailsForm.controls['AAR_TRIM_STA'].value,
             'AAR_COLOR': this.aarDetailsForm.controls['AAR_COLOR'].value,
             'AAR_ENG_GLOSS_DEF': this.aarDetailsForm.controls['AAR_ENG_GLOSS_DEF'].value,
             'AAR_ASPECT_COLOR': this.aarDetailsForm.controls['AAR_ASPECT_COLOR'].value,
             'AAR_ENG_TIER1': this.aarDetailsForm.controls['AAR_ENG_TIER1'].value,
             'AAR_ENG_TIER1_LOC': this.aarDetailsForm.controls['AAR_ENG_TIER1_LOC'].value,
             'AAR_ENG_DRAFT_ANALYSIS': this.aarDetailsForm.controls['AAR_ENG_DRAFT_ANALYSIS'].value,
             'AAR_PHYSICAL_GRAIN_MAPPING': this.aarDetailsForm.controls['AAR_PHYSICAL_GRAIN_MAPPING'].value,
             'AAR_ENG_DIGITAL_GRAIN_MAPP':this.aarDetailsForm.controls['AAR_ENG_DIGITAL_GRAIN_MAPP'].value,
             'AAR_TOTAL_KICK_OFF':this.aarDetailsForm.controls['AAR_TOTAL_KICK_OFF'].value,
             'AAR_REMARKS':this.aarDetailsForm.controls['AAR_REMARKS'].value,
             'AAR_STATUS':this.aarDetailsForm.controls['AAR_STATUS'].value,
             'AAR_NO_OF_CAVITY':this.aarDetailsForm.controls['AAR_NO_OF_CAVITY'].value,
             'AAR_CAVITY_VALIDATION_REMARKS':this.aarDetailsForm.controls['AAR_CAVITY_VALIDATION_REMARKS'].value,
             'AAR_GLOSS_COLOR':this.aarDetailsForm.controls['AAR_GLOSS_COLOR'].value,
             'AAR_GRAIN_STATUS':this.aarDetailsForm.controls['AAR_GRAIN_STATUS'].value
           }
         }
       }
     
   }
   };
       this.services.invokeService("UpdateAarDetails", params, "http://schemas.cordys.com/AARWSAppServerPackage", false, false).
       then((res: any) => 
       {
        this.AAR_REF_NO = res[0].AAR_REF_NO;
        this.saveAARVariants();
        Swal.fire("",'Saved Successfully', 'success');
        console.log(this.aarDetailsForm.value);
       })
        
}
     }
     validateAARFields()
     {
      this.saveFlag = true;
      if(!this.aarDetailsForm.invalid)
      {
        Swal.fire('', 'Please enter all mandatory fields', 'warning');
          return ;
      }
      else{
        return true;
      }
     }
     saveAARVariants()
     {
      let param = {};
      let params = {};
      let variantArr = [];
      if(this.datavalidate(this.aarDetailsForm.controls['AAR_VARIANT'].value) != '')
      {
  for(let i =0;i<this.aarDetailsForm.controls['AAR_VARIANT'].value.length;i++){
    param = {
     
        new: {
          AAR_VARIANTS: {
           'AAR_REF_NO':this.AAR_REF_NO,
           'AARV_VARIANT':this.aarDetailsForm.controls['AAR_VARIANT'].value[i].LMF_ID,
           'AARV_VALUE':"",
           'AARV_IS_ACTIVE':'1'
          
          }
        }
      }
      variantArr.push(param);
  
  }
}
params ={"tuple":variantArr}
this.services.invokeService("UpdateAarVariants", params, "http://schemas.cordys.com/AARWSAppServerPackage", false, false).
       then((res: any) => 
       {
       })
     }
     fileuploaded:any;
     fileName:any;
     onFileChanged(event:any){
       this.fileuploaded = event.target.files[0];
       this.fileName =  event.target.files[0].name;
       console.log(this.fileuploaded);
       
     }
     datavalidate(data: string | null | undefined) {
    
      if (data != undefined && data != null && data != "") {
        return data;
      } else {
        return "";
      }
    }
}
