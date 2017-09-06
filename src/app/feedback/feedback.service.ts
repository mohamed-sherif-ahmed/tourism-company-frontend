import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Feedback} from './Feedback';
import {AppConstants} from '../app.constants';
import {RequestMethod, RequestOptions} from '@angular/http';
import {HttpClient} from '@angular/common/http';
interface Response {
  valid: boolean ;
  msg: string ;
}
@Injectable()
export class FeedbackService {
  valid: Boolean = true ;
  err: string ;
  constructor(private http: Http , private httpPoster: HttpClient ) { }
  getFeedbacks(): Promise<Feedback[]> {
    const url = `${AppConstants.API_ENDPOINT}/feedback`;
    const api_key = localStorage.getItem('api_key');
    const user_id = localStorage.getItem('user_id');
    const options = new RequestOptions({
      method: RequestMethod.Get,
      body: {
        'user_id': user_id,
        'api_key': api_key
      }
    });
    return this.http.request(url, options).toPromise().then(response => {
      this.valid = response.json().valid ;
      this.err = response.json().msg ;
      return response.json().res as Feedback[];
    });
  }
  delFeedbacks( feedbackId: string): void {
    const url = `${AppConstants.API_ENDPOINT}/feedback/delete`;
    const api_key = localStorage.getItem('api_key');
    const user_id = localStorage.getItem('user_id');
    this.httpPoster.post<Response>(url, {
      'user_id': user_id,
      'api_key': api_key,
      'offer_id': feedbackId,
    }).subscribe(data => {
      this.valid = data.valid ;
      this.err = data.msg;
    });
  }
}
