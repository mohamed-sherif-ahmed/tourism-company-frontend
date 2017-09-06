import { Component, OnInit } from '@angular/core';

import {OfferService} from './offer.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {
  constructor(private s: OfferService) { }

  ngOnInit() {
  }
}
