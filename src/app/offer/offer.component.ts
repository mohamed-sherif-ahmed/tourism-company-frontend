import { Component, OnInit } from '@angular/core';
import {OfferService} from './offer.service';
import {Offer} from './Offer' ;
import {Test} from "./Test";
import { FileSelectDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import {FileItem, ParsedResponseHeaders} from "ng2-file-upload";

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.less'],
})

export class OfferComponent implements OnInit {
  constructor(private offerService: OfferService) { }
  file: FileList;
 offersArray: Offer[];
 neededDate: Date;
  data: {} ;
  error: {};
  files:any ;
  selectedoffer: Offer;
  addedOffer:Offer;
  ngOnInit() {
    this.viewOffers(this.neededDate) ;
  }
  viewOffers(date: Date ): void {
    this.offerService.getOffers( date ).then((res) => {
      if (this.offerService.valid) {
        this.offersArray = res;
      } else { // nzahrlo this.offerService.err fl UI
          }
    });
  }
  sumbitdateclicked(year , month , day){
    this.neededDate = new Date (year , month , day)
    console.log(this.neededDate);
    this.viewOffers(this.neededDate) ;
  }
  viewOffer(id: string , long: number): void {
    this.offerService.getOffer( id  ).then((res) => {
      if (this.offerService.valid) {
        this.selectedoffer = res;
      } else { // nzahrlo this.offerService.err fl UI
      }
    });
  }
createOffer(title , desc ,exp , points , type ,condition , img ){
  this.addedOffer = new Offer(title,desc,exp,10,type,condition,img,img);
  console.log(this.addedOffer);
    console.log("test");
    this.offerService.addOffer(this.addedOffer,this.files);

}
delete(name:string){
  this.offerService.delOffer(name);
}
  pdfHandler(event): void {
    console.log('pdfhandler called');
    this.files = event.target.files ;
  }
  test(): void {
    console.log('sdfdsss');
  }

}
