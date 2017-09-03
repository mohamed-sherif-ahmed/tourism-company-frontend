import { Component, OnInit } from '@angular/core';

export class Package {
  id : number;
  name : string;
};

export class Voucher{
  id : number;
  name : string;
};

const PACKAGES : Package[] = [  // array of packages
  {id : 1234 , name : 'Delux'},
  {id : 1111 , name : 'Grand'},
  {id : 2736 , name : 'Golden'},
  {id : 4959 , name : 'Platinum'},
  {id : 2746 , name : 'Economy'},
  
];

const VOUCHERS : Voucher[] =[    // array of vouchers
  {id : 1234 , name : 'orange'},
  {id : 1234 , name : 'ASU'},
  {id : 1234 , name : 'GUC'},
  {id : 1111 , name : 'vodafone'},
  {id : 1111 , name : 'AUC'},
  {id : 1111 , name : 'Emirates-Airlines'},
  {id : 2736 , name : 'egypt-air'},
  {id : 2736 , name : 'honda'},
  {id : 2736 , name : 'toyota-egy'},
  {id : 2736 , name : 'los santos tours'},
  {id : 2736 , name : 'freelanceORG'},
  {id : 4959 , name : 'telecom egypt'},
  {id : 2746 , name : 'GE'},

];



@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
 // styleUrls: ['./packages.component.css']
 styles: [`
  .selected {
    background-color: #CFD8DC !important;
    color: white;
  }
  .heroes {
    margin: 0 0 2em 0;
    list-style-type: none;
    padding: 0;
    width: 15em;
  }
  .heroes li {
    cursor: pointer;
    position: relative;
    left: 0;
    background-color: #EEE;
    margin: .5em;
    padding: .3em 0;
    height: 1.6em;
    border-radius: 4px;
  }
  .heroes li.selected:hover {
    background-color: #BBD8DC !important;
    color: white;
  }
  .heroes li:hover {
    color: #607D8B;
    background-color: #DDD;
    left: .1em;
  }
  .heroes .text {
    position: relative;
    top: -3px;
  }
  .heroes .badge {
    display: inline-block;
    font-size: small;
    color: white;
    padding: 0.8em 0.7em 0 0.7em;
    background-color: #607D8B;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    margin-right: .8em;
    border-radius: 4px 0 0 4px;
  }
`]
})

export class PackagesComponent /*implements OnInit*/ {
  title = 'Available Packages : ';
  packages = PACKAGES; // exposing packages array for binding
  vouchers = VOUCHERS; // exposing vouchers array for binding
  fvouchers; // array of filtered vouchers that match the selected package
  selectedPackage : Package;

  onSelect(p:Package):void{
    
    this.selectedPackage = p;
    this.fvouchers=this.vouchers.filter(voucher=>voucher.id===p.id);

    }


 /* constructor() { }

  ngOnInit() {
  }*/

}
