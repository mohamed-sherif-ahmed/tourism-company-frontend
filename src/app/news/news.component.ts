import { Component, OnInit } from '@angular/core';
import {NewsService} from './news.service';
import {News} from './news' ;
import { FileSelectDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import {FileItem, ParsedResponseHeaders} from "ng2-file-upload";
import {newsjson} from './newsjson' ;
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-offer',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.less'],
})

export class NewsComponent implements OnInit {
  constructor(private offerService: NewsService) { }
 offersArray: newsjson[];
 neededDate: Date;
  data: {} ;
  voucherForm: FormGroup;
  editVoucherForm:FormGroup;
  error: {};
  filter: boolean= false;
  filesb: boolean= false;
  files:any;
  divVisable:boolean = false;
  editedOfferId:string;
  addedOffer:News;
  viewedOffer:newsjson;
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
        this.offersArray=this.esponse as newsjson[] ;}
         else { // nzahrlo this.offerService.err fl UI
          }
    });
  }
  sumbitdateclicked(){
    this.neededDate = new Date (Date.now());
    console.log(this.neededDate);
    this.viewOffers(this.neededDate) ;
  }
  viewOffer(id: string ): void {
    this.visable = true ;
    this.editedOfferId=id;
    console.log(this.editedOfferId);
    this.offerService.getOffer( id  ).then((res) => {
      this.esponse = JSON.parse(res)['response'] ;
      if (JSON.parse(res)['valid']) {
        this.viewedOffer=this.esponse['data'] as newsjson  ;

      } else { // nzahrlo this.offerService.err fl UI
      }
    });
  }
createOffer(){
   this.creationDate = new Date(Date.now());
  this.addedOffer = new News(this.voucherForm.value.titleEnglish,this.voucherForm.value.titleArabic,this.voucherForm.value.descriptionEnglish,this.voucherForm.value.descriptionArabic,this.creationDate);
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
 this.addedOffer = new News(this.editVoucherForm.value.titleEnglish,this.editVoucherForm.value.titleArabic,this.editVoucherForm.value.descriptionEnglish,this.editVoucherForm.value.descriptionArabic,this.creationDate);
 console.log(this.addedOffer);
 this.offerService.editOffer(this.addedOffer,this.editedOfferId);
 this.offerService.addOfferimg(this.editedOfferId,this.files);

       this.editVoucherForm.reset();


}
delete(name:string){
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
