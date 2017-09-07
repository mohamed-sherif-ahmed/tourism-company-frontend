import { Component, OnInit } from '@angular/core';

import {OfferService} from './offer.service';
import {Offer} from './Offer' ;
@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {
  constructor(private offerService: OfferService) { }
 offersArray: Offer[];
  selectedoffer: Offer;
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
