import {Injectable} from '@angular/core';
import {Offer} from './Offer' ;
import {Http, Headers} from '@angular/http';
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
    const url = `im4booking/offer`;
    const api_key = localStorage.getItem('api_key');
    const user_id = localStorage.getItem('user_id');
    const hh = new Headers();
    hh.append('', '');
    hh.append('Content-Type', 'application/json');
    hh.append('Access-Control-Allow-Origin', '*');
    hh.append('Access-Control-Allow-Headers', '*');
    hh.append('Access-Control-Allow-Methods', '*');
    hh.append('Access-Control-Allow-Credentials', '*');
    hh.append('Access-Control-Allow-Request-Headers', '*');
    hh.append('Access-Control-Allow-Request-Methods', '*');
    hh.append('Access-Control-Origin', '*');
    hh.append('Accept', 'application/json');
    const options = new RequestOptions({
      headers: hh
    });
    return this.http.get(url, options
    ).toPromise().then(response => {
      this.valid = response.json().valid ;
      this.err = response.json().msg ;
      return response.json().res as Offer[];
    });
  }
  getOffer( id: string, long: number): Promise<Offer> {
    const url = `im4booking/offer/` + id;
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

  addOffer(offer: Offer, files :any): void {
    const url = `/add_of/`;
    const api_key = localStorage.getItem('api_key');
    const user_id = localStorage.getItem('user_id');
    const header = new Headers();
    header.append('Accept', 'application/json');
    const options = new RequestOptions({
      headers: header
    });
    const formData = new FormData();
    if (files.length > 0) {
      for ( let file of files) {
           formData.append('files', file, file.name);
      }}
    formData.append('user_id', user_id);
    formData.append('offer', JSON.stringify(offer));
    this.http.post(url, formData, options).subscribe(data => {
      this.valid = data['valid'] ;
      this.err = data['msg'];
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
