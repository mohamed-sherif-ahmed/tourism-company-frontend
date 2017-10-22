import { Component, OnInit } from '@angular/core';
import { PackagesService } from './packages.service';
import { Package } from './package';
import { Voucher } from './voucher';
import { package_json } from './package_json';
import { voucher_json } from './voucher_json';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css'],
})

export class PackagesComponent implements OnInit {
  packagesArr: package_json [];
  vouchersArr: voucher_json [];
  editEnabled = false;
  editedPackage: string;
  editedVoucher: number;
  editFormPackage: package_json;
  editFormVoucher: Voucher;
  imgFile: any;
  packVoucherArr: string [];
  showImageUpload = false;
  packageID: string;
  voucherID: string;
  constructor (private packageService: PackagesService) { }
  ngOnInit() {
    this.packageService.getPackages().then(res => {
      console.log(res);
      var body = JSON.parse(res);
      this.packagesArr = body['response'] as package_json [];
      console.log(this.packagesArr);
    });
    this.packageService.getVouchers().then(res => {
      var body = JSON.parse(res);
      console.log(body);
      this.vouchersArr = body['response'] as voucher_json [];
    });
  }

  editPackage(packageId: string): void {
    this.editEnabled = true;
    this.editedPackage = packageId;
    const selectedPackage = this.packagesArr.filter( pack => {
      if (pack._id === this.editedPackage) {
        return pack;
      }
    });
    this.editFormPackage = selectedPackage[0];
  }
  addNewPackage(name: string, nameAr: string, points: number, desc: string, descAr: string): void {
    const data = {
      'name': [
        {
          'lang': 'en',
          'value': name
        },
        {
          'lang': 'ar',
          'value': nameAr
        }
      ],
      'points': points,
      'description': [
        {
          'lang': 'en',
          'value': desc
        },
        {
          'lang': 'ar',
          'value': descAr
        }
      ]
      //'vouchers': []
    }
    console.log(data);
    this.packageService.addPackage(data).then(res => {
      console.log(res);
      const response = res['response'];
      this.packageID = response['_id'];
      this.showImageUpload = true;
    });
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
    // this.editedVoucher = voucherId;
    // const selectedPackage = this.vouchersArr.filter( voucher => {
    //   if (voucher.id === this.editedVoucher) {
    //     return voucher;
    //   }
    // });
    // this.editFormVoucher = selectedPackage[0];
  }
  fileHandler(type ,event): void {
    var objId: string;
    this.imgFile = event.target.files;
    if (type == 1) {
      objId = this.packageID;
      console.log(`sending file for ${objId}`);
      this.packageService.sendFile(objId, this.imgFile);
    } else if (type == 0) {
      objId = this.voucherID;
      console.log(`sending file for ${objId}`);
      this.packageService.sendFileImgVoucher(objId, this.imgFile);
    } else {
      objId = this.voucherID;
      console.log(`sending file for ${objId}`);
      this.packageService.sendFilePDFVoucher(objId, this.imgFile);
    }
  }
  addPackVoucher(id: number): void {
    this.packVoucherArr.push(id.toString());
  }
  addVoucher(title: string, desc: string, cond: string, points: string, descAr: string, condAr: string, EnddateStr: string, StartDateStr: string, titleAr: string, packageId: string): void { 
    const endDate = new Date(EnddateStr);
    const startDate = new Date(StartDateStr);
    console.log(packageId);
    const data = {
      'name': [
        {
          'lang': 'en',
          'value': title
        },
        {
          'lang': 'ar',
          'value': titleAr
        }
      ],
      'description':[
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
      'is_voucher': true,
      'given_points': points,
      'condition':[
        {
          'lang': 'en',
          'value': cond
        },
        {
          'lang': 'ar',
          'value': condAr
        }
      ],
      'condition_type': true
    };
    console.log(data);
    this.packageService.addVouchers(data, packageId).then(res => {
      const body = res['response'];
      this.voucherID = body['_id'];
      this.showImageUpload = true;
    });
  }
}
