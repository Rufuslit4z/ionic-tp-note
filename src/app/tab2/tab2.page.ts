import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor() {}

  alert : any = {};
  alerts : any[] = [];
  id : number = 0;


  createAlerte(event : any){
    console.log(event.target)
    this.alerts.push(this.alert);
    this.id++;
  }

}
