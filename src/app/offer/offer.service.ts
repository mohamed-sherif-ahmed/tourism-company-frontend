import {Injectable} from '@angular/core';
import {Offer} from './Offer' ;
import {Http, Headers} from '@angular/http';
import {AppConstants} from '../app.constants';
import {RequestMethod, RequestOptions} from '@angular/http';
import {HttpClient} from '@angular/common/http';
import {offerjson} from './offerjson'
interface Response {
valid: boolean ;
  res: string ;
  msg: string ;
  offer_id:string;
}
@Injectable()
export class OfferService {
  valid: Boolean = true ;
  err: string  ;
  files:any ;
  conditions:Boolean = true;
  offerbeingCreatedID:string;
  finished:Boolean = false;
  constructor(private http: Http , private httpPoster: HttpClient ) { }
  getOffers(sinceDate: Date ): Promise<string> {
    const url = `im4booking/offer`;
    const api_key = localStorage.getItem('api_key');
    const user_id = localStorage.getItem('user_id');
    const hh = new Headers();
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
      return response['_body'] as string;
    });
  }
  getOffer( id: string): Promise<string> {
    const url = `/im4booking/offer/` + id;
    const api_key = localStorage.getItem('api_key');
    const user_id = localStorage.getItem('user_id');
    const hh = new Headers();
    hh.append('api_key' ,api_key);
    hh.append('user_id' ,user_id);
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
      return response['_body'] as string;
    });
  }


  addOffer(offer: Offer):  void {
    const url = `/im4booking/offer/`;
    const api_key = localStorage.getItem('api_key');
    const user_id = localStorage.getItem('user_id');
    if (offer.conditionar =="" && offer.condition =="")
    this.conditions =false ;

console.log({name: [
  {
    lang: "ar",
    value: offer.titlear
  },
  {
    lang: "en",
    value: offer.name
  }
],
description: [
  {
    lang: "ar",
    value: offer.description
  },
  {
    lang: "en",
    value: offer.desar
  }
],
exp_date: offer.exp_date,
creation_date: offer.creationDate,
given_points: offer.given_points,
condition_type: this.conditions,
condition: [
  {
    lang: "ar",
    value: offer.conditionar
  },
  {
    lang: "en",
    value: offer.condition
  }
],
is_voucher: false,
price: offer.price,

});
    this.httpPoster.post<JSON>(url, {
      'user_id': user_id,
      'api_key': api_key,
      'offer': {
	name: [
		{
			lang: "ar",
			value: offer.titlear
		},
		{
			lang: "en",
			value: offer.name
		}
	],
	description: [
		{
			lang: "ar",
			value: offer.description
		},
		{
			lang: "en",
			value: offer.desar
		}
	],
	exp_date: offer.exp_date,
	creation_date: offer.creationDate,
	condition_type: this.conditions,
	condition: [
		{
			lang: "ar",
			value: offer.conditionar
		},
		{
			lang: "en",
			value: offer.condition
		}
	],
	is_voucher: false,
  price: offer.price,

}
    }).subscribe(data => {
    console.log(data);

  this.offerbeingCreatedID= data['response'];
      console.log("the response   ",this.offerbeingCreatedID);
      this.offerbeingCreatedID=this.offerbeingCreatedID['_id'];
      console.log("the id   ",this.offerbeingCreatedID);
      if (! (this.offerbeingCreatedID ))
      {
        this.err = "ERROR"
      }
      else{
        this.err="Success";
      }

      this.createOfferimg();

    });


  }
  addOfferpdf(offerId: string, files : File[]): void {
    const url = `/upload_media/offer`;
    const api_key = localStorage.getItem('api_key');
    const user_id = localStorage.getItem('user_id');
    const header = new Headers();
    // header.append('Accept', 'multipart/form-data');
    // header.append('Content-Type', 'multipart/form-data');
    const options = new RequestOptions({
      headers: header
    });
    const formData = new FormData();
      for ( let file of files) {
           formData.append('file', file, file.name);

      }
    formData.append('user_id', user_id);
    formData.append('offer_id', offerId);
    formData.append('id',this.offerbeingCreatedID);
    this.http.post(url, formData, options).subscribe(data => {
      this.valid = data['valid'] ;
      this.err = data['msg'];
    });
  }
  addOfferimg(offerId: string, files : File[]): void {

    const url = `/upload_pic/offer`;
    const api_key = localStorage.getItem('api_key');
    const user_id = localStorage.getItem('user_id');
    const header = new Headers();
    // header.append('Accept', 'multipart/form-data');
    // header.append('Content-Type', 'multipart/form-data');
    const options = new RequestOptions({
      headers: header
    });
    const formData = new FormData();
      for ( let file of files) {
           formData.append('file', file, file.name);
      }
    formData.append('user_id', user_id);
    formData.append('id', offerId);
    this.http.post(url, formData, options).subscribe(data => {
      this.valid = data['valid'] ;
      this.err = data['msg'];
    });
  }

  editOffer(offer: Offer , offerId: string): void {
    const url = `/im4booking/offer/edit`;
    const api_key = localStorage.getItem('api_key');
    const user_id = localStorage.getItem('user_id');
    console.log(offerId ,{name: [
  		{
  			lang: "ar",
  			value: offer.titlear
  		},
  		{
  			lang: "en",
  			value: offer.name
  		}
  	],
  	description: [
  		{
  			lang: "ar",
  			value: offer.description
  		},
  		{
  			lang: "en",
  			value: offer.desar
  		}
  	],
  	exp_date: offer.exp_date,
  	creation_date: offer.creationDate,
  	condition_type: this.conditions,
  	condition: [
  		{
  			lang: "ar",
  			value: offer.conditionar
  		},
  		{
  			lang: "en",
  			value: offer.condition
  		}
  	],
  	is_voucher: false,
    price: offer.price,

  } )
    this.httpPoster.post<Response>(url, {
      'user_id': user_id,
      'api_key': api_key,
      'offer_id': offerId,
      'new_offer':{
	name: [
		{
			lang: "ar",
			value: offer.titlear
		},
		{
			lang: "en",
			value: offer.name
		}
	],
	description: [
		{
			lang: "ar",
			value: offer.description
		},
		{
			lang: "en",
			value: offer.desar
		}
	],
	exp_date: offer.exp_date,
	creation_date: offer.creationDate,
	condition_type: this.conditions,
	condition: [
		{
			lang: "ar",
			value: offer.conditionar
		},
		{
			lang: "en",
			value: offer.condition
		}
	],
	is_voucher: false,
  price: offer.price,

}
    }).subscribe(data => {
      console.log(data );
      console.log(    data['msg']);
        console.log(data.msg);
  this.err = data['msg'];

    });
  }
  createOfferimg(){

      console.log(this.offerbeingCreatedID);
      this.addOfferimg(this.offerbeingCreatedID, this.files);
  }
  delOffer( offerId: string): void {
    const url = `/im4booking/offer/delete`;
    const api_key = localStorage.getItem('api_key');
    const user_id = localStorage.getItem('user_id');
    this.httpPoster.post<Response>(url, {
      'user_id': user_id,
      'api_key': api_key,
      'offer_id': offerId,
    }).subscribe(data => {
    console.log(data );
    console.log(data['msg']);
      console.log(data.msg);
    this.err = data['msg'];

    });
  }
}
