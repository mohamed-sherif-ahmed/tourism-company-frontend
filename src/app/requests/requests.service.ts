import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class RequestService {
    constructor (private http: Http) { };

    getAvailableRequests(): Promise<any> {
        const url = `im4booking/request/`;
        const api_key = localStorage.getItem('api_key');
        const user_id = localStorage.getItem('user_id');
        const header = new Headers();
        header.append('api_key', api_key);
        header.append('user_id', user_id);
        const options = new RequestOptions({
            headers: header
          });
        return this.http.get(url, options).toPromise().then(response => {
            console.log(response);
            return JSON.parse(response['_body']);
        });
    }

    changeRequestStatus(requestId: string, newState: string): Promise<JSON> {
        const url = `im4booking/request/${requestId}/`;
        const api_key = localStorage.getItem('api_key');
        const user_id = localStorage.getItem('user_id');
        const header = new Headers();
        
        let body = {
            'new_status': newState,
            'user_id': user_id,
            'api_key': api_key
        }
        return this.http.post(url, body).toPromise().then(response => {
            return response['body'];
        });
    }
}