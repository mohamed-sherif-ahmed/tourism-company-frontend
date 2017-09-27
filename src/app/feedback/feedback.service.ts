import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Feedback} from './Feedback';
import {AppConstants} from '../app.constants';
import {RequestMethod, RequestOptions} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
interface Response {
  valid: boolean ;
  msg: string ;
}
@Injectable()
export class FeedbackService {
  valid: Boolean = true ;
  err: string ;
  header = new HttpHeaders();
  constructor(private http: Http , private httpPoster: HttpClient ) { }
  getFeedbacks(): Promise<Feedback[]> {
    // this.header.append('Content-Type', 'application/json' );
    // this.header.append('Access-Control-Allow-Origin', '*' );
    const url = `/add_of`;
    const api_key = localStorage.getItem('api_key');
    const user_id = localStorage.getItem('user_id');
    const hh = new Headers();
    hh.append('ahgjjkgfjgfjghfhgfhgfjhgfhjgfghjfjhfjhgfjhgfhjfjhfhjgss', 'asdsasd');
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
      return response.json().res as Feedback[];
    });
  }
   delFeedbacks(): void {
    this.header.append('Content-Type', 'application/json' );
    this.header.append('Access-Control-Allow-Origin', '*' );
     const url = `/add_of/1`;
    const api_key = localStorage.getItem('api_key');
    const user_id = localStorage.getItem('user_id');
    this.httpPoster.post<Response>(url, {
      'sss': 'aadsansfdsdgfdha',
    }, {
      headers: this.header
    }).subscribe(data => {
      this.valid = data.valid ;
      this.err = data.msg;
    });
  }
}
