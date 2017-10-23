import { Component, OnInit } from '@angular/core';
import {OfferService} from './offer.service';
import {Offer} from './Offer' ;
import {Test} from "./Test";
import { FileSelectDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import {FileItem, ParsedResponseHeaders} from "ng2-file-upload";
import {offerjson} from './offerjson' ;
@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.less'],
})

export class OfferComponent implements OnInit {
  constructor(private offerService: OfferService) { }
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
  sumbitdateclicked(year , month , day){
    this.neededDate = new Date (year , month , day)
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
        this.viewedOffer=this.esponse['data'] as offerjson  ;

      } else { // nzahrlo this.offerService.err fl UI
      }
    });
  }
createOffer(title , titlear ,desc ,descar,exp ,points ,condition, conditionar,price){
   this.expdate = new Date (exp);
   this.creationDate = new Date(Date.now());
  console.log(title , titlear ,desc ,descar,exp , points ,condition, conditionar);
  this.addedOffer = new Offer(title,titlear,desc,descar,this.expdate,this.creationDate,points as number,'img to be uploaded ', "offer",condition,conditionar,price as number);
  console.log(this.addedOffer);
    console.log("test");
    this.filesb= true ;
    this.offerService.addOffer(this.addedOffer);
}

editOffer(title , desc ,exp , points , type ,condition){

//this.offerService.editOffer( new Offer(title,desc,exp,points as number,"offer",condition,'img to be uploaded ') , this.editedOfferId);

}

edit(id: string){
this.divVisable= true;
this.editedOfferId=id ;


}
createOfferpdf(){
  console.log(this.addedOffer);
    console.log(this.offerService.offerbeingCreatedID);
    this.offerService.addOfferpdf(this.offerService.offerbeingCreatedID, this.files);
}


createOfferimg(){
  console.log(this.addedOffer);
    console.log(this.offerService.offerbeingCreatedID);
    this.offerService.addOfferimg(this.offerService.offerbeingCreatedID, this.files);
}
editOfferimg(){
    console.log(this.editedOfferId);
    this.offerService.addOfferimg(this.editedOfferId, this.files);
}
editOfferpdf(){
    console.log(this.editedOfferId);
    this.offerService.addOfferpdf(this.editedOfferId, this.files);
}

delete(name:string){
  this.offerService.delOffer(name);
}


  pdfHandler(event): void {
    console.log('pdfhandler called');
  this.files = event.target.files
  }
  test(): void {
    console.log('sdfdsss');
  }

}
