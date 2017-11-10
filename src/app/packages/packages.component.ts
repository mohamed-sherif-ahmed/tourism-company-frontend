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
  editedVoucher: string;
  editFormPackage: package_json;
  editFormVoucher: voucher_json;
  imgFile: any;
  packVoucherArr: string [];
  showImageUpload = false;
  packageID: string;
  voucherID: string;

  packageForm: FormGroup;  
  voucherForm: FormGroup;
  editPackageForm: FormGroup;
  editVoucherForm: FormGroup;

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

    this.editPackageForm = new FormGroup({
      nameEnglish: new FormControl(),
      nameArabic: new FormControl(),
      points: new FormControl(),
      descriptionEnglish: new FormControl(),
      descriptionArabic: new FormControl()
    });

    this.editVoucherForm = new FormGroup({
      titleEnglish: new FormControl(),
      titleArabic: new FormControl(),
      descriptionEnglish: new FormControl(),
      descriptionArabic: new FormControl(),
      conditionEnglish: new FormControl(),
      conditionArabic: new FormControl(),
      package: new FormControl(),
      oneUse: new FormControl(),
      points: new FormControl()
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
      this.packageService.addPackage(data).then(res => {
        const valid = res['valid'];
        if (valid) {
          const response = res['response'];
          this.packageID = response['_id'];
          this.packageService.sendFile(this.packageID, this.imgFile);
          this.statusMessage = "Success";
          this.packageForm.reset();
        } else {

          this.statusMessage = "Error in Sending Package Data";
        }
      });
    } else {
      this.statusMessage = "Couldn't connect to the internet";
    }
  }

  editPackageSubmit(): void {
    if (this.editPackageForm.valid) {
      const data = {
        'name': [
          {
            'lang': 'en',
            'value': this.editPackageForm.value.nameEnglish
          },
          {
            'lang': 'ar',
            'value': this.editPackageForm.value.nameArabic
          }
        ],
        'points': this.editPackageForm.value.points,
        'description': [
          {
            'lang': 'en',
            'value': this.editPackageForm.value.descriptionEnglish
          },
          {
            'lang': 'ar',
            'value': this.editPackageForm.value.descriptionArabic
          }
        ]
        //'vouchers': []
      }
      console.log(data);
      this.packageService.editPackage(data).then(res => {
        const valid = res['valid'];
        if (valid) {
          const response = res['response'];
          this.packageID = response['_id'];
          this.packageService.sendFile(this.packageID, this.imgFile);
          this.statusMessage = "Success";
          //this.packageForm.reset();
        } else {

          this.statusMessage = "Error in Sending Package Data";
        }
      });
    } else {
      this.statusMessage = "Couldn't connect to the internet";
    }
  }

  editPackage(id: string): void {
    this.editEnabled = true;
    this.editedVoucher = id;
    const selectedPackage = this.packagesArr.filter( voucher => {
      if (voucher._id == this.editedVoucher) {
        return voucher;
      }
    });
    this.editFormPackage = selectedPackage[0];
    this.editPackageForm.patchValue({
      nameEnglish: this.editFormPackage.name[0].value,
      nameArabic: this.editFormPackage.name[1].value,
      points: this.editFormPackage.points,
      descriptionEnglish: this.editFormPackage.description[0].value,
      descriptionArabic: this.editFormPackage.description[1].value
    });
  }
 
  cancelEdit(): void {
    this.editEnabled = false;
  }
  submitEditPackage(): void {
  }
  // submitEditVoucher(title: string, desc: string, expdate: string, points: number, condition: string, id: number, package_id: number): void {
  //   const tempVoucher = new Voucher(title, id, desc, expdate, points, condition, package_id);
  //   this.packageService.editVoucher(tempVoucher);
  // }
  editVoucher(voucherId: string): void {
    this.editEnabled = true;
    this.editedVoucher = voucherId;
    const selectedPackage = this.vouchersArr.filter( voucher => {
      if (voucher._id == this.editedVoucher) {
        return voucher;
      }
    });
    this.editFormVoucher = selectedPackage[0];
    this.editVoucherForm.patchValue({
      titleEnglish: "TEST STRING",
      titleArabic: this.editFormVoucher.name[1].value,
      descriptionEnglish: this.editFormVoucher.description[0].value,
      descriptionArabic: this.editFormVoucher.description[1].value,
      conditionEnglish: this.editFormVoucher.condition[0].value,
      conditionArabic: this.editFormVoucher.condition[1].value
    });
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
  editFileHandler(type ,event): void {
    var objId: string;
    this.imgFile = event.target.files;
    if (type == 1) {
      objId = this.packageID;
      console.log(`sending file for ${objId}`);
      this.packageService.sendFile(objId, this.imgFile);
    } else if (type == 0) {
      objId = this.voucherID;
      console.log(`sending file for ${objId}`);
      this.packageService.sendFileImgVoucher(objId, this.imgFile).then(res => {
      });
    } else {
      objId = this.voucherID;
      console.log(`sending file for ${objId}`);
      this.packageService.sendFilePDFVoucher(objId, this.imgFile);
    }
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
        'used_one': ob,
        'in_package': this.voucherForm.value.package
      };
      console.log(data);
      this.packageService.addVouchers(data, this.voucherForm.value.package).then(res => {
        const valid = res['valid'];
        if (valid == true){
          const body = res['response'];
          this.voucherID = body['_id'];
          this.packageService.sendFileImgVoucher(this.voucherID, this.imgFile);
          this.voucherForm.reset();
        } else {
          
        }
      });
    } else {
      console.log(this.voucherForm.value);
    }
  }

  editVoucherSubmit(): void {

    if (this.editVoucherForm.valid) {
      var ob: boolean;
      if (this.editVoucherForm.value.oneUse == "yes") {
        ob = true;
      } else { 
        ob = false;
      }
      const data = {
        'name': [
          {
            'lang': 'en',
            'value': this.editVoucherForm.value.titleEnglish
          },
          {
            'lang': 'ar',
            'value': this.editVoucherForm.value.titleArabic
          }
        ],
        'description':[
          {
            'lang': 'en',
            'value': this.editVoucherForm.value.descriptionEnglish
          },
          {
            'lang': 'ar',
            'value': this.editVoucherForm.value.descriptionArabic
          }
        ],
        'is_voucher': true,
        'given_points': this.editVoucherForm.value.points,
        'condition':[
          {
            'lang': 'en',
            'value': this.editVoucherForm.value.conditionEnglish
          },
          {
            'lang': 'ar',
            'value': this.editVoucherForm.value.conditionArabic
          }
        ],
        'condition_type': true,
        'used_one': ob,
        'in_package': this.voucherForm.value.package
      };
      console.log(data);
      this.packageService.editVoucher(data, this.editVoucherForm.value.package).then(res => {
        const valid = res['valid'];
        if (valid == true){
          const body = res['response'];
          this.voucherID = body['_id'];
          //this.packageService.sendFileImgVoucher(this.voucherID, this.imgFile);
          //this.voucherForm.reset();
        } else {
          
        }
      });
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
