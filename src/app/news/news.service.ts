import {Injectable} from '@angular/core';
import {News} from './News' ;
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
export class NewsService {
  valid: Boolean = true ;
  err: string ;
  constructor(private http: Http , private httpPoster: HttpClient ) { }
  getNews(sinceDate: Date ): Promise<News[]> {
    const url = `im4booking/news`;
    const api_key = localStorage.getItem('api_key');
    const user_id = localStorage.getItem('user_id');
    const hh = new Headers();
    hh.append('since_date', JSON.stringify(sinceDate) );
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
        return response.json().res as News[];
    });
  }
  getNew( id: string): Promise<News> {
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
      this.valid = response.json().valid ;
      this.err = response.json().msg ;
      return response.json().res as News;
    });
  }


  addNews( news: News, files : File[]): void {
    const url = `/add_of/`;
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
    formData.append('offer', JSON.stringify(news));
    this.http.post(url, formData, options).subscribe(data => {
      this.valid = data['valid'] ;
      this.err = data['msg'];
    });
  }
  editNews(newNews: News , offerId: string): void {
    const url = `${AppConstants.API_ENDPOINT}/offer/edit`;
    const api_key = localStorage.getItem('api_key');
    const user_id = localStorage.getItem('user_id');
    this.httpPoster.post<Response>(url, {
      'user_id': user_id,
      'api_key': api_key,
      'news_id': offerId,
      'new_fields': newNews
    }).subscribe(data => {
      this.valid = data.valid ;
      this.err = data.msg;
    });
  }
  delNews( newsId: string): void {
    const url = `${AppConstants.API_ENDPOINT}/offer/delete`;
    const api_key = localStorage.getItem('api_key');
    const user_id = localStorage.getItem('user_id');
    this.httpPoster.post<Response>(url, {
      'user_id': user_id,
      'api_key': api_key,
      'offer_id': newsId,
    }).subscribe(data => {
      this.valid = data.valid ;
      this.err = data.msg;
    });
  }
}
