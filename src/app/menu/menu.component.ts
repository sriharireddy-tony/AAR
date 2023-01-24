import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }
  tName:string = 'partsCreation';

  ngOnInit(): void {
    let routerName = window.location.href.split('/')[window.location.href.split('/').length - 1];
    this.tName = routerName;
  }
  tabClick(tName:string){
this.tName = tName;
  }
}
