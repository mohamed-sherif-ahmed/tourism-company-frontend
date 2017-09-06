import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Package } from './package';
import {AppConstants} from '../app.constants';
import {RequestMethod, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable ()
export class PackagesService {
  constructor (private http: Http) { }

  addPackage(data: Package): void {
    const url = `${AppConstants.API_ENDPOINT}/package`;
    const api_key = localStorage.getItem('api_key');
    const user_id = localStorage.getItem('user_id');
    this.http.post(url, {
      'api_key': api_key,
      'user_id': user_id,
      'package': data
    });
  }

  getPackages(): Promise<Package[]> {
    const url = `${AppConstants.API_ENDPOINT}/package`;
    const api_key = localStorage.getItem('api_key');
    const options = new RequestOptions({
      method: RequestMethod.Get,
      body: {
        'api_key': api_key
      }
    });
    // let data: Package[];
    // this.http.request(url, options).subscribe(response => {
    //   if ( response['valid'] === true) {
    //     data = response['res'] as Package[];
    //   }
    // });
    return this.http.request(url, options).toPromise().then(response => {
      return response.json().res as Package[];
    });
  }
}
