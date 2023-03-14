import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MasterDataComponent } from '../master-data/master-data.component';
import { PartsSummaryComponent } from '../parts-summary/parts-summary.component';
import { CommonService } from '../services/common.service';

@Component({
  providers:[MasterDataComponent ],
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  constructor(private commonService: CommonService) {}
  tName:string = 'partsCreation';

  ngOnInit(): void {
    let routerName = window.location.href.split('/')[window.location.href.split('/').length - 1];
    this.tName = routerName;
  }
  tabClick(tName:string){
this.tName = tName;
  }
  saveTab(){
    if(this.tName == 'partsSummary'){
      this.commonService.callCompFunctionFun();
    }
    if(this.tName == 'masterData'){
        this.commonService.saveAllMasterData();
    }
   
  }
}
