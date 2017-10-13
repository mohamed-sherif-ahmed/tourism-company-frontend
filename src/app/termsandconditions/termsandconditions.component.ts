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
 esponse:any ;
  ngOnInit() {
    this.viewterms();
  }
  viewterms(): void {
    this.service.getTerms().then((res) => {
      this.esponse = JSON.parse(res)['response'] ;
      if (JSON.parse(res)['valid']) {
        this.terms=this.esponse['data'];

      } else { // nzahrlo this.offerService.err fl UI
      }
    });
  }
  add(s : string ){

    this.service.addterms(s);
  }

}
