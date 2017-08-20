import { Component, OnInit, AfterViewInit } from '@angular/core';

declare const $: any;
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements AfterViewInit {
  ngAfterViewInit() {
    $.material.init();
  }
}
