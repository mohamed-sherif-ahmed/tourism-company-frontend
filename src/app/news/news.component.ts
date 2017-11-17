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
 err : string ;
  data: {} ;
  editingarray:newsjson[];
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
        this.offersArray=this.esponse as newsjson[] ;
  console.log(this.offersArray);

        this.offersArray =  this.offersArray.map((offer) => {
          if (offer.img_path == "" || offer.img_path== null || offer.img_path== "TO BE uploaded")
          {
            offer.img_path = "/news.png" ;
          }
    offer.editingNow = false ;
          return offer ;
          });

      }

      console.log(this.offersArray);

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
    this.err = this.offerService.err;
    this.voucherForm.reset();
}


edit(id: string){
  this.divVisable= true;
  this.editedOfferId=id;
  console.log(this.editedOfferId);
  this.editingarray = this.offersArray.filter((offer) => {
    return offer._id == this.editedOfferId;
  });
  this.editVoucherForm.patchValue({
    titleEnglish: this.editingarray[0].title[1].value,
    titleArabic: this.editingarray[0].title[0].value,
    descriptionEnglish: this.editingarray[0].body[0].value,
    descriptionArabic: this.editingarray[0].body[1].value,


  });
  this.offersArray =  this.offersArray.map((offer) => {
    if (offer._id == id)
    {

        offer.editingNow = true ;
    }

    return offer ;
    });


}
editsumbit(){
  this.creationDate = new Date(Date.now());
 this.addedOffer = new News(this.editVoucherForm.value.titleEnglish,this.editVoucherForm.value.titleArabic,this.editVoucherForm.value.descriptionEnglish,this.editVoucherForm.value.descriptionArabic,this.creationDate);
 console.log(this.addedOffer);
 this.offerService.editOffer(this.addedOffer,this.editedOfferId);
    this.editVoucherForm.reset();
    setTimeout(()=>{    //<<<---    using ()=> syntax
        this.sumbitdateclicked();
     },2000);setTimeout(()=>{    //<<<---    using ()=> syntax
         this.sumbitdateclicked();
      },2000);setTimeout(()=>{    //<<<---    using ()=> syntax
          this.sumbitdateclicked();
       },2000);setTimeout(()=>{    //<<<---    using ()=> syntax
           this.sumbitdateclicked();
        },2000);setTimeout(()=>{    //<<<---    using ()=> syntax
            this.sumbitdateclicked();
         },2000);setTimeout(()=>{    //<<<---    using ()=> syntax
             this.sumbitdateclicked();
          },2000);
 this.offerService.addOfferimg(this.editedOfferId,this.files);



}
delete(name:string){
  this.offerService.delOffer(name);
}
hide(){

  this.divVisable= false;
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
