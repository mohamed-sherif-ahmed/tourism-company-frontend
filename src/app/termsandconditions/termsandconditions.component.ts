import { Component, OnInit } from '@angular/core';
import {TermsandconditionsService} from './termsandconditions.service'
@Component({
  selector: 'app-termsandconditions',
  templateUrl: './termsandconditions.component.html',
  styleUrls: ['./termsandconditions.component.less']
})
export class TermsandconditionsComponent implements OnInit {

  constructor(private service : TermsandconditionsService) { }

 terms : string ;
  ngOnInit() {
    this.viewterms();
  }
  viewterms(): void {
    this.service.getTerms().then((res) => {
      if (this.service.valid) {
        this.terms = res ;
      } else { // nzahrlo this.offerService.err fl UI
      }
    });
  }
  add(s : string ){

    this.service.addterms(s);
  }

}
