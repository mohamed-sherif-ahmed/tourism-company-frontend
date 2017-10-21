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
        const url = `/request/${requestId}/`;
        const api_key = localStorage.getItem('api_key');
        const user_id = localStorage.getItem('user_id');
        const header = new Headers();
        header.append('api_key', api_key);
        header.append('user_id', user_id);
        const options = new RequestOptions({
            headers: header,
            body: {
                'new_state': newState
            }
          });
        return this.http.post(url, options).toPromise().then(response => {
            return response['requests'];
        });
    }
}