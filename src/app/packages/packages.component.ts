import { Component, OnInit } from '@angular/core';
import { PackagesService } from './packages.service';
import { Package } from './package';
import { Voucher } from './voucher';
import { package_json } from './package_json';
import { voucher_json } from './voucher_json';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms'; 

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

  packageForm: FormGroup;  
  voucherForm: FormGroup;

  statusMessage: string;

  constructor (private packageService: PackagesService) { }
  ngOnInit() {
    this.packageForm = new FormGroup({
      nameEnglish: new FormControl('', Validators.required),
      nameArabic: new FormControl('', Validators.required),
      points: new FormControl('', Validators.required),
      descriptionEnglish: new FormControl('', Validators.required),
      descriptionArabic: new FormControl('', Validators.required)
    });

    this.voucherForm = new FormGroup({
      titleEnglish: new FormControl('', Validators.required),
      titleArabic: new FormControl('', Validators.required),
      descriptionEnglish: new FormControl('', Validators.required),
      descriptionArabic: new FormControl('', Validators.required),
      conditionEnglish: new FormControl('', Validators.required),
      conditionArabic: new FormControl('', Validators.required),
      package: new FormControl('', Validators.required),
      oneUse: new FormControl('', Validators.required),
      points: new FormControl('', Validators.required)
    });

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

  newPackageSubmit(): void {
    if (this.packageForm.valid) {
      const data = {
        'name': [
          {
            'lang': 'en',
            'value': this.packageForm.value.nameEnglish
          },
          {
            'lang': 'ar',
            'value': this.packageForm.value.nameArabic
          }
        ],
        'points': this.packageForm.value.points,
        'description': [
          {
            'lang': 'en',
            'value': this.packageForm.value.descriptionEnglish
          },
          {
            'lang': 'ar',
            'value': this.packageForm.value.descriptionArabic
          }
        ]
        //'vouchers': []
      }
      console.log(data);
      this.packageService.addPackage(data, this.imgFile).then(res => {
        console.log(res);
        const response = res['response'];
        this.packageID = response['_id'];
        this.statusMessage = "Success";
      });
      this.packageForm.reset();
    } else {
      this.statusMessage = "Couldn't connect to the internet";
    }
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
    // if (type == 1) {
    //   objId = this.packageID;
    //   console.log(`sending file for ${objId}`);
    //   //this.packageService.sendFile(objId, this.imgFile);
    // } else if (type == 0) {
    //   objId = this.voucherID;
    //   console.log(`sending file for ${objId}`);
    //   this.packageService.sendFileImgVoucher(objId, this.imgFile).then(res => {
    //   });
    // } else {
    //   objId = this.voucherID;
    //   console.log(`sending file for ${objId}`);
    //   this.packageService.sendFilePDFVoucher(objId, this.imgFile);
    // }
  }
  addPackVoucher(id: number): void {
    this.packVoucherArr.push(id.toString());
  }
  newVoucherSubmit(): void {
    if (this.voucherForm.valid) {
      var ob: boolean;
      if (this.voucherForm.value.oneUse == "yes") {
        ob = true;
      } else { 
        ob = false;
      }
      const data = {
        'name': [
          {
            'lang': 'en',
            'value': this.voucherForm.value.titleEnglish
          },
          {
            'lang': 'ar',
            'value': this.voucherForm.value.titleArabic
          }
        ],
        'description':[
          {
            'lang': 'en',
            'value': this.voucherForm.value.descriptionEnglish
          },
          {
            'lang': 'ar',
            'value': this.voucherForm.value.descriptionArabic
          }
        ],
        'is_voucher': true,
        'given_points': this.voucherForm.value.points,
        'condition':[
          {
            'lang': 'en',
            'value': this.voucherForm.value.conditionEnglish
          },
          {
            'lang': 'ar',
            'value': this.voucherForm.value.conditionArabic
          }
        ],
        'condition_type': true,
        'used_one': ob
      };
      console.log(data);
      this.packageService.addVouchers(data, this.voucherForm.value.package, this.imgFile).then(res => {
        const body = res['response'];
        this.voucherID = body['_id'];
        this.showImageUpload = true;
      });
      this.voucherForm.reset();
    } else {
      console.log(this.voucherForm.value);
    }
  }
  deletePackage(id): void {
    this.packageService.deletePackage(id);
  }
  deleteVoucher(id): void {
    this.packageService.deleteVoucher(id);
  }
}
