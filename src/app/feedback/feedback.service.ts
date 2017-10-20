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
  getFeedbacks(): Promise<string> {
    // this.header.append('Content-Type', 'application/json' );
    // this.header.append('Access-Control-Allow-Origin', '*' );
    const url = `im4booking/feedback`;
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
        return response['_body'] as string;
    });
  }
   delFeedbacks(id:string): void {
    this.header.append('Content-Type', 'application/json' );
    this.header.append('Access-Control-Allow-Origin', '*' );
     const url = `im4booking/feedback/delete`;
    const api_key = localStorage.getItem('api_key');
    const user_id = localStorage.getItem('user_id');
    this.httpPoster.post<Response>(url, {
      'user_id': user_id,
      'api_key': api_key,
      'feedback_id': id,
    }, {
      headers: this.header
    }).subscribe(data => {
      this.valid = data.valid ;
      this.err = data.msg;
    });
  }
}
