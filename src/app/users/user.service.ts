import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
    constructor (private http: Http) { };

    getAvailableUsers(): Promise<JSON[]> {
        const url = `/admin/users`;
        const api_key = localStorage.getItem('api_key');
        const user_id = localStorage.getItem('user_id');
        const header = new Headers();
        header.append('api_key', api_key);
        header.append('user_id', user_id);
        const options = new RequestOptions({
            headers: header
          });
        return this.http.get(url, options).toPromise().then(response => {
            return response['requests'];
        });
    }

    addNewUser(email: string, password:string, username: string): Promise<JSON> {
        const url = `/admin/user`;
        const api_key = localStorage.getItem('api_key');
        const user_id = localStorage.getItem('user_id');
        const header = new Headers();
        header.append('api_key', api_key);
        header.append('user_id', user_id);
        const options = new RequestOptions({
            headers: header,
            body: {
                'username': username,
                'password': password,
                'email': email
            }
          });
        return this.http.post(url, options).toPromise().then(response => {
            return response['requests'];
        });
    }

    changeUserPassword(userId: string, newPassword: string): Promise<JSON> {
        const url = `/request/${userId}/`;
        const api_key = localStorage.getItem('api_key');
        const user_id = localStorage.getItem('user_id');
        const header = new Headers();
        header.append('api_key', api_key);
        header.append('user_id', user_id);
        const options = new RequestOptions({
            headers: header,
            body: {
                'new_password': newPassword
            }
          });
        return this.http.post(url, options).toPromise().then(response => {
            return response['requests'];
        });
    }
}