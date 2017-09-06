import {Injectable} from '@angular/core';
import {Offer} from './Offer' ;
import {Http} from '@angular/http';
import {AppConstants} from '../app.constants';
import {RequestMethod, RequestOptions} from '@angular/http';
import {HttpClient} from '@angular/common/http';
interface Response {
valid: boolean ;
  res: string ;
  msg: string ;
}
@Injectable()
export class OfferService {
  valid: Boolean = true ;
  err: string ;
  constructor(private http: Http , private httpPoster: HttpClient ) { }
  getOffers(sinceDate: Date , long: number): Promise<Offer[]> {
    const url = `${AppConstants.API_ENDPOINT}/offer`;
    const options = new RequestOptions({
      method: RequestMethod.Get,
      body: {
        'since_date': sinceDate ,
        'long' : long
      }
    });
    return this.http.request(url, options).toPromise().then(response => {
      this.valid = response.json().valid ;
      this.err = response.json().msg ;
      return response.json().res as Offer[];
    });
  }
  getOffer( id: string, long: number): Promise<Offer> {
    const url = `${AppConstants.API_ENDPOINT}/offer/` + id;
    const options = new RequestOptions({
      method: RequestMethod.Get,
      body: {
        'long' : long
      }
    });
    return this.http.request(url, options).toPromise().then(response => {
      this.valid = response.json().valid ;
      this.err = response.json().msg ;
      return response.json().res as Offer;
    });
  }

  addOffer(offer: Offer): void {
    const url = `${AppConstants.API_ENDPOINT}/offer`;
    const api_key = localStorage.getItem('api_key');
    const user_id = localStorage.getItem('user_id');
    this.httpPoster.post<Response>(url, {
      'user_id': user_id,
      'api_key': api_key,
      'offer': offer
    }).subscribe(data => {
      this.valid = data.valid ;
      this.err = data.msg;
    });
  }
  editOffer(newOffer: Offer , offerId: string): void {
    const url = `${AppConstants.API_ENDPOINT}/offer/edit`;
    const api_key = localStorage.getItem('api_key');
    const user_id = localStorage.getItem('user_id');
    this.httpPoster.post<Response>(url, {
      'user_id': user_id,
      'api_key': api_key,
      'offer_id': offerId,
      'new_fields': newOffer
    }).subscribe(data => {
      this.valid = data.valid ;
      this.err = data.msg;
    });
  }
  delOffer( offerId: string): void {
    const url = `${AppConstants.API_ENDPOINT}/offer/delete`;
    const api_key = localStorage.getItem('api_key');
    const user_id = localStorage.getItem('user_id');
    this.httpPoster.post<Response>(url, {
      'user_id': user_id,
      'api_key': api_key,
      'offer_id': offerId,
    }).subscribe(data => {
      this.valid = data.valid ;
      this.err = data.msg;
    });
  }
}
