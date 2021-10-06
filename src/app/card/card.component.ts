import { Component, Input, OnInit } from '@angular/core';
declare var require: any;
var moment = require('moment');
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() pet: object;

  constructor() { }

  ngOnInit(): void {
    this.getAge(this.pet['bornAt']);
  }

  getAge(bornAt) {
    var months = moment().diff(bornAt, 'months', false);
    this.pet['age'] = months;
  }

}
