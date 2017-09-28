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
  data: {} ;
  error: {};
 public fil: FileItem ;
  public upload: FileUploader = new FileUploader({url : '/add_of'});
  selectedoffer: Offer;
   tests: Test[] = [
    { id: 11, name: 'Mr. Nice' },
    { id: 12, name: 'Narco' },
    { id: 13, name: 'Bombasto' },
    { id: 14, name: 'Celeritas' },
    { id: 15, name: 'Magneta' },
    { id: 16, name: 'RubberMan' },
    { id: 17, name: 'Dynama' },
    { id: 18, name: 'Dr IQ' },
    { id: 19, name: 'Magma' },
    { id: 20, name: 'Tornado' }
  ];
  ngOnInit() {
    this.upload.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
    this.upload.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
  }
  viewOffers(date: Date , long: number): void {
    this.offerService.getOffers( date , long ).then((res) => {
      if (this.offerService.valid) {
        this.offersArray = res;
      } else { // nzahrlo this.offerService.err fl UI
          }
    });
  }
  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
     this.data = JSON.parse(response);
  }

  onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
     this.error = JSON.parse(response);
  }
  viewOffer(id: string , long: number): void {
    this.offerService.getOffer( id , long ).then((res) => {
      if (this.offerService.valid) {
        this.selectedoffer = res;
      } else { // nzahrlo this.offerService.err fl UI
      }
    });
  }
<<<<<<< HEAD
  pdfHandler(event): void {
    console.log('pdfhandler called');
    this.offerService.addOffer(this.selectedoffer, event.target.files);
=======
  pdfHandler(files: FileList): void {
    console.log('sdfdsss');
    this.offerService.addOffer(this.selectedoffer, files);
>>>>>>> 5b4e6aa18efe259aef007c5279c05339b73d7e0b
  }
  test(): void {
    console.log('sdfdsss');
  }

}
