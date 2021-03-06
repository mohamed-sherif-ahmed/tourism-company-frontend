import {Injectable} from '@angular/core';
import {News} from './news' ;
import {Http, Headers} from '@angular/http';
import {AppConstants} from '../app.constants';
import {RequestMethod, RequestOptions} from '@angular/http';
import {HttpClient} from '@angular/common/http';
import {newsjson} from './newsjson'
interface Response {
valid: boolean ;
  res: string ;
  msg: string ;
  offer_id:string;
}
@Injectable()
export class NewsService {
  valid: Boolean = true ;
  err: string  ;
  files:any;
  conditions:Boolean = true;
  offerbeingCreatedID:string;
  constructor(private http: Http , private httpPoster: HttpClient ) { }
  getOffers(sinceDate: Date ): Promise<string> {
    const url = `im4booking/news`;
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
    const url = `/im4booking/news/` + id;
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


  addOffer(offer: News): void {
    const url = `/im4booking/news/`;
    const api_key = localStorage.getItem('api_key');
    const user_id = localStorage.getItem('user_id');
    console.log( {title: [
      {
        lang: "ar",
        value: offer.titlear
      },
      {
        lang: "en",
        value: offer.title
      }
    ],
    body: [
      {
        lang: "ar",
        value: offer.bodyar
      },
      {
        lang: "en",
        value:offer.body
      }
    ],
    creation_date: offer.date ,
    img_path: "TO BE uploaded",
    media_path : "TO BE uploaded"});
    this.httpPoster.post<Response>(url, {
      'user_id': user_id,
      'api_key': api_key,
      'news': {  title: [
    		{
    			lang: "ar",
    			value: offer.titlear
    		},
    		{
    			lang: "en",
    			value: offer.title
    		}
    	],
    	body: [
    		{
    			lang: "ar",
    			value: offer.bodyar
    		},
    		{
    			lang: "en",
    			value:offer.body
    		}
    	],
    	creation_date: offer.date ,
      img_path: "TO BE uploaded",
      media_path : "TO BE uploaded"

	}
    }).subscribe(data => {
    console.log(data);

      this.offerbeingCreatedID= data['response'];
      console.log("the response   ",this.offerbeingCreatedID);
      this.offerbeingCreatedID=this.offerbeingCreatedID['_id'];
      console.log("the id   ",this.offerbeingCreatedID);
          this.createOfferimg();
          if (! (this.offerbeingCreatedID ))
          {
            this.err = "ERROR";
          }
          else{
            this.err = "Success";
          }
    });
  }
  addOfferpdf(offerId: string, files : File[]): void {
    const url = `/upload_media/news`;
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
    formData.append('news_id', offerId);
    formData.append('id',this.offerbeingCreatedID);
    this.http.post(url, formData, options).subscribe(data => {
      this.valid = data['valid'] ;
      this.err = data['msg'];
    });
  }
  addOfferimg(offerId: string, files : File[]): void {

    const url = `/upload_pic/news`;
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
    formData.append('news_id', offerId);
    formData.append('id',this.offerbeingCreatedID);
    this.http.post(url, formData, options).subscribe(data => {
      this.valid = data['valid'] ;
      this.err = data['msg'];
    });
  }

  editOffer(offer: News , offerId: string): void {
    const url = `im4booking/news/edit`;
    const api_key = localStorage.getItem('api_key');
    const user_id = localStorage.getItem('user_id');
    this.httpPoster.post<Response>(url, {
      'user_id': user_id,
      'api_key': api_key,
      'news_id': offerId,
      'new_news': {  title: [
    		{
    			lang: "ar",
    			value: offer.titlear
    		},
    		{
    			lang: "en",
    			value: offer.title
    		}
    	],
    	body: [
    		{
    			lang: "ar",
    			value: offer.bodyar
    		},
    		{
    			lang: "en",
    			value:offer.body
    		}
    	],
    	creation_date: offer.date ,
      img_path: "TO BE uploaded",
      media_path : "TO BE uploaded"

	}
    }).subscribe(data => {
      this.valid = data.valid ;
      this.err = data.msg;
    });
  }
  createOfferimg(){

      console.log(this.offerbeingCreatedID);
      this.addOfferimg(this.offerbeingCreatedID, this.files);
  }
  delOffer( offerId: string): void {
    const url = `im4booking/news/delete`;
    const api_key = localStorage.getItem('api_key');
    const user_id = localStorage.getItem('user_id');
    this.httpPoster.post<Response>(url, {
      'user_id': user_id,
      'api_key': api_key,
      'news_id': offerId,
    }).subscribe(data => {
      this.valid = data.valid ;
      this.err = data.msg;
    });
  }
}
