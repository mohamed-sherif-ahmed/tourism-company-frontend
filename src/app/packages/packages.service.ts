import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Package } from './package';
import {AppConstants} from '../app.constants';
import {RequestMethod, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Voucher} from './voucher';

@Injectable ()
export class PackagesService {
  constructor (private http: Http) { }

  addPackage(data: string): Promise<JSON> {
    const url = `im4booking/package`;
    const api_key = localStorage.getItem('api_key');
    const user_id = localStorage.getItem('user_id');

    const body = {
      'api_key': api_key,
      'user_id': user_id,
      'package': data
    };
    
    return this.http.post(url, body).toPromise().then(response => {
      return response.json();
    });
  }

  getPackages(): Promise<string> {
    const url = `/package`;
    const api_key = localStorage.getItem('api_key');
    const options = new RequestOptions({
      method: RequestMethod.Get,
      body: {
        'api_key': api_key
      }
    });
    return this.http.request(url, options).toPromise().then(response => {
      console.log(response);
      const body = response['body'];
      return body;
    });
  }
  getPackage(id): Promise<Package> {
    const url = `package/${id}`;
    const api_key = localStorage.getItem('api_key');
    const header = new Headers();
    header.append('api_key', api_key);
    const options = new RequestOptions({
      method: RequestMethod.Get,
      body: {
        'api_key': api_key
      },
      headers: header
    });
    return this.http.request(url, options).toPromise().then(response => {
      return response.json().res as Package;
    });
  }
  addVouchers(data: string): Promise<JSON> {

    const url = `package/voucher`;
    const api_key = localStorage.getItem('api_key');
    const user_id = localStorage.getItem('user_id');

    const body = {
      'api_key': api_key,
      'user_id': user_id,
      'voucher': data
    }

    return this.http.post(url, body).toPromise().then(response => {
      return response.json();
    });
  }
  getVoucher(package_id: number): Promise<Voucher> {
    const url = `package/voucher/${package_id}`;
    const header = new Headers();
    header.append('package_id', package_id.toString());
    const options = new RequestOptions({
      method: RequestMethod.Get,
      body: {
        'package_id': package_id
      }
    });
    return this.http.request(url, options).toPromise().then(response => {
      return response.json().res as Voucher;
    });
  }
  editVoucher(data: Voucher): Promise<JSON> {
    const url = `package/voucher/edit/${data.id}`;
    const api_key = localStorage.getItem('api_key');
    const user_id = localStorage.getItem('user_id');
    const header = new Headers();
    header.append('api_key', api_key);
    header.append('user_id', user_id);
    const options = new RequestOptions({
      body: {
        'voucher': data
      },
      headers: header
    });
    return this.http.post(url, options).toPromise().then(response => {
      return response.json();
    });
  }
  getVouchers(): Promise<string> {
    const url = `package/voucher/`;
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
      return response['body'];
    })
  }
}
