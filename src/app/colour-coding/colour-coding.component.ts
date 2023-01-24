import { Component, OnInit } from '@angular/core';
declare var $: any

@Component({
  selector: 'app-colour-coding',
  templateUrl: './colour-coding.component.html',
  styleUrls: ['./colour-coding.component.css']
})
export class ColourCodingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  uploadImage() {
    $("#imageUpload").click();
  }
}
