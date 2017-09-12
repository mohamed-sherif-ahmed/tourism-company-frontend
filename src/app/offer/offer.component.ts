import { Component, OnInit } from '@angular/core';
import {OfferService} from './offer.service';
import {Offer} from './Offer' ;
import {Test} from "./Test";
@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.less']
})

export class OfferComponent implements OnInit {
  constructor(private offerService: OfferService) { }
 offersArray: Offer[];
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
  }
  viewOffers(date: Date , long: number): void {
    this.offerService.getOffers( date , long ).then((res) => {
      if (this.offerService.valid) {
        this.offersArray = res;
      } else { // nzahrlo this.offerService.err fl UI
          }
    });
  }
  viewOffer(id: string , long: number): void {
    this.offerService.getOffer( id , long ).then((res) => {
      if (this.offerService.valid) {
        this.selectedoffer = res;
      } else { // nzahrlo this.offerService.err fl UI
      }
    });
  }

}
