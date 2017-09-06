import { Component, OnInit } from '@angular/core';
import { PackagesService } from './packages.service';
import { Package } from './package';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css'],
})

export class PackagesComponent /*implements OnInit*/ {
  packagesArr: Package[];
  constructor (private packageService: PackagesService) { }
  viewPackages(): void {
   this.packageService.getPackages().then(arr => {
     this.packagesArr = arr;
   });
  }
}
