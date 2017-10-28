import { Component, OnInit } from '@angular/core';
import {OfferService} from './offer.service';
import {Offer} from './Offer' ;
import {Test} from "./Test";
import { FileSelectDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import {FileItem, ParsedResponseHeaders} from "ng2-file-upload";
import {offerjson} from './offerjson' ;
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.less'],
})

export class OfferComponent implements OnInit {
  constructor(private offerService: OfferService) { }
    voucherForm: FormGroup;
    editVoucherForm:FormGroup;

 offersArray: offerjson[];
 neededDate: Date;
  data: {} ;
  error: {};
  filter: boolean= false;
  filesb: boolean= false;
  files:any;
  divVisable:boolean = false;
  editedOfferId:string;
  addedOffer:Offer;
  viewedOffer:offerjson;
  expdate:Date;
  creationDate:Date;
  called : boolean = false;
  esponse:any ;
  visable:boolean = false;
  ngOnInit() {
    this.viewOffers(this.neededDate) ;
    this.voucherForm = new FormGroup({
      titleEnglish: new FormControl('', Validators.required),
      titleArabic: new FormControl('', Validators.required),
      descriptionEnglish: new FormControl('', Validators.required),
      descriptionArabic: new FormControl('', Validators.required),
      conditionEnglish: new FormControl('', Validators.required),
      conditionArabic: new FormControl('', Validators.required),
      package: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      expiryDate: new FormControl('', Validators.required),
      oneUse: new FormControl('', Validators.required),
      points: new FormControl('', Validators.required)
    });
    this.editVoucherForm = new FormGroup({
      titleEnglish: new FormControl('', Validators.required),
      titleArabic: new FormControl('', Validators.required),
      descriptionEnglish: new FormControl('', Validators.required),
      descriptionArabic: new FormControl('', Validators.required),
      conditionEnglish: new FormControl('', Validators.required),
      conditionArabic: new FormControl('', Validators.required),
      package: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      oneUse: new FormControl('', Validators.required),
      points: new FormControl('', Validators.required),
      newexpiryDate: new FormControl('', Validators.required),

    });


  }
  viewOffers(date: Date ): void {
    this.offerService.getOffers( date ).then((res) => {
      this.esponse = JSON.parse(res)['response'] ;
      if (JSON.parse(res)['valid']) {
        this.offersArray=this.esponse as offerjson[] ;}
         else { // nzahrlo this.offerService.err fl UI
          }
    });
  }
  sumbitdateclicked(){
    this.neededDate = new Date (Date.now());
    this.viewOffers(this.neededDate) ;
  }
  viewOffer(id: string ): void {
    this.visable = true ;
    this.editedOfferId=id;
    console.log(this.editedOfferId);
    this.offerService.getOffer( id  ).then((res) => {
      this.esponse = JSON.parse(res)['response'] ;
      if (JSON.parse(res)['valid']) {
        this.viewedOffer=this.esponse['data'] as offerjson  ;

      } else { // nzahrlo this.offerService.err fl UI
      }
    });
  }
createOffer(){
   this.creationDate = new Date(Date.now());
     this.expdate = new Date(this.voucherForm.value.expiryDate._d);
  this.addedOffer = new Offer(this.voucherForm.value.titleEnglish,this.voucherForm.value.titleArabic,this.voucherForm.value.descriptionEnglish,this.voucherForm.value.descriptionArabic,this.expdate,this.creationDate,'img to be uploaded ', "offer",this.voucherForm.value.conditionEnglish,this.voucherForm.value.conditionArabic,this.voucherForm.value.points as number);
  console.log(this.addedOffer);
    console.log("test");
    this.filesb= true ;

    this.offerService.addOffer(this.addedOffer);
      this.voucherForm.reset();

}



edit(id: string){
this.divVisable= true;
this.editedOfferId=id;
console.log(this.editedOfferId);

}
editsumbit(){
  this.creationDate = new Date(Date.now());
   this.expdate = new Date(this.editVoucherForm.value.newexpiryDate._d);
  this.addedOffer = new Offer(this.editVoucherForm.value.titleEnglish,this.editVoucherForm.value.titleArabic,this.editVoucherForm.value.descriptionEnglish,this.editVoucherForm.value.descriptionArabic,this.expdate,this.creationDate,'img to be uploaded ', "offer",this.editVoucherForm.value.conditionEnglish,this.editVoucherForm.value.conditionArabic,this.editVoucherForm.value.points as number);
  console.log(this.addedOffer);
this.offerService.editOffer(this.addedOffer,this.editedOfferId);
this.offerService.addOfferimg(this.editedOfferId,this.files);

      this.editVoucherForm.reset();
}

delete(name:string){
  console.log(name);
  this.offerService.delOffer(name);
}


  pdfHandler(event): void {
    console.log('pdfhandler called');
  this.files = event.target.files
  this.offerService.files = event.target.files;
  }
  test(): void {
    console.log('sdfdsss');
  }

}
