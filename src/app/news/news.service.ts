import {News} from './news';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {RequestMethod, RequestOptions} from '@angular/http';
import {AppConstants} from '../app.constants';
import 'rxjs/add/operator/toPromise';
@Injectable ()
export class NewsService {
      constructor (private http: Http) { }
      postNews(data:News): void {
          const url = `${AppConstants.API_ENDPOINT}/news`;
          const api_key = localStorage.getItem('api_key');
          const user_id = localStorage.getItem('user_id');
          
          this.http.post(url, {
              'api_key':api_key,
              'since_date':user_id,
              'news':data,
          });
      }
        getNews():Promise<News[]>{
            const url = `${AppConstants.API_ENDPOINT}/news`;
            const api_key = localStorage.getItem('api_key');
            const since_date = localStorage.getItem('since_date');
            const options = new RequestOptions({
                method: RequestMethod.Get ,
                body:{
                    'api_key':api_key,
                    'since_date':since_date
                }
            });
            return this.http.request(url , options).toPromise().then(Response=>{return Response.json().res as News[];});


        }
        
}