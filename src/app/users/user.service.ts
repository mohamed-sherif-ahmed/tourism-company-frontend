import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
    constructor (private http: Http) { };

    getAvailableUsers(): Promise<JSON> {
        const url = `im4booking/user/`;
        const api_key = localStorage.getItem('api_key');
        const user_id = localStorage.getItem('user_id');
        const header = new Headers();
        header.append('api_key', api_key);
        header.append('user_id', user_id);
        const options = new RequestOptions({
            headers: header
          });
        return this.http.get(url, options).toPromise().then(response => {
            return JSON.parse(response['_body']);
        });
    }

    editUser(data, id): Promise<JSON[]> {
        const url = `im4booking/user/edit`;
        const api_key = localStorage.getItem('api_key');
        const user_id = localStorage.getItem('user_id');

        const body = {
            'user_id': user_id,
            'api_key': api_key,
            'client_id': id,
            'new_user': data
        }

        return this.http.post(url, body).toPromise().then(response => {
            return response['requests'];
        });
    }

    getUser(userID): Promise<any> {
        const url = `im4booking/user/${userID}`;
        const api_key = localStorage.getItem('api_key');
        const user_id = localStorage.getItem('user_id');
        const header = new Headers();
        header.append('api_key', api_key);
        header.append('user_id', user_id);
        const options = new RequestOptions({
            headers: header
          });
        return this.http.get(url, options).toPromise().then(response => {
            const body = response['_body'];
            return JSON.parse(body);
        });
    }

    addNewUser(data): void {
        const url = `im4booking/user`;
        const api_key = localStorage.getItem('api_key');
        const user_id = localStorage.getItem('user_id');
        this.http.post(url, {
            'api_key': api_key,
            'user_id': user_id,
            'new_user': data
        }).subscribe();
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