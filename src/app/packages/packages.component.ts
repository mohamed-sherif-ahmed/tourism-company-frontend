import { Component, OnInit } from '@angular/core';
import { PackagesService } from './packages.service';
import { Package } from './package';
import { Voucher } from './voucher';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css'],
})

export class PackagesComponent implements OnInit {
  packagesArr: Package [];
  vouchersArr: Voucher [];
  editEnabled = false;
  editedPackage: number;
  editedVoucher: number;
  editFormPackage: Package;
  editFormVoucher: Voucher;
  imgFile: any;
  packVoucherArr: string [];
  constructor (private packageService: PackagesService) { }
  ngOnInit() {
    this.packageService.getPackages().then(res => this.packagesArr = res);
    this.packageService.getVouchers().then(res => this.vouchersArr = res);
  }

  editPackage(packageId: number): void {
    this.editEnabled = true;
    this.editedPackage = packageId;
    const selectedPackage = this.packagesArr.filter( pack => {
      if (pack.id === this.editedPackage) {
        return pack;
      }
    });
    this.editFormPackage = selectedPackage[0];
  }
  addNewPackage(name, points): void {
    const data = {
      'name': name,
      'points': points,
      'listed_customer': [],
      'vouchers': []
    }
    console.log(data);
  this.packageService.addPackage(JSON.stringify(data));

  }
  cancelEdit(): void {
    this.editEnabled = false;
  }
  submitEditPackage(): void {

  }
  submitEditVoucher(title: string, desc: string, expdate: string, points: number, condition: string, id: number, package_id: number): void {
    const tempVoucher = new Voucher(title, id, desc, expdate, points, condition, package_id);
    this.packageService.editVoucher(tempVoucher);
  }
  editVoucher(voucherId: number): void {
    this.editEnabled = true;
    this.editedVoucher = voucherId;
    const selectedPackage = this.vouchersArr.filter( voucher => {
      if (voucher.id === this.editedVoucher) {
        return voucher;
      }
    });
    this.editFormVoucher = selectedPackage[0];
  }
  fileHandler(event): void {
      this.imgFile = event.target.files;
  }
  addPackVoucher(id: number): void {
    this.packVoucherArr.push(id.toString());
  }
  addVoucher(title: string, desc: string, cond: string, points: string, descAr: string, condAr: string, EnddateStr: string, StartDateStr: string, titleAr: string): void { 
    const endDate = new Date(EnddateStr);
    const startDate = new Date(StartDateStr);
    const data = {
      'title': [
        {
          'lang': 'en',
          'value': title
        },
        {
          'lang': 'ar',
          'value': titleAr
        }
      ],
      'desc':[
        {
          'lang': 'en',
          'value': desc
        },
        {
          'lang': 'ar',
          'value': descAr
        }
      ],
      'creation_date': startDate,
      'exp_date': endDate,
      'type': '',
      'points': points,
      'condition':[
        {
          'lang': 'en',
          'value': cond
        },
        {
          'lang': 'ar',
          'value': condAr
        }
      ]
    };
    console.log(data);
    this.packageService.addVouchers(JSON.stringify(data));
  }
}
