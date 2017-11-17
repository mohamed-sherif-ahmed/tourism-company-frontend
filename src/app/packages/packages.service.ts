import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Package } from './package';
import {AppConstants} from '../app.constants';
import {RequestMethod, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Voucher} from './voucher';
import { voucher_json } from './voucher_json';

@Injectable ()
export class PackagesService {
  constructor (private http: Http) { }

  addPackage(data): Promise<JSON> {
    const url = `im4booking/package`;
    const api_key = localStorage.getItem('api_key');
    const user_id = localStorage.getItem('user_id');

    const body = {
      'api_key': api_key,
      'user_id': user_id,
      'package': data
    }

    return this.http.post(url, body).toPromise().then(response => {
      return response.json();  
    });
  }

  getPackages(): Promise<any> {
    const url = `/im4booking/package`;
    const api_key = localStorage.getItem('api_key');
    const options = new RequestOptions({
      method: RequestMethod.Get,
      body: {
        'api_key': api_key
      }
    });
    return this.http.request(url, options).toPromise().then(response => {
      console.log(response);
      const body = response['_body'];
      console.log(`body : ${body}`);
      return body;
    });
  }
  getPackage(id): Promise<any> {
    const url = `im4booking/package/${id}`;
    const api_key = localStorage.getItem('api_key');
    const user_id = localStorage.getItem('user_id');
    const headers = new Headers();

    headers.append('api_key', api_key);
    headers.append('user_id', user_id);

    const options = new RequestOptions({
      headers: headers
    });

    return this.http.get(url, options).toPromise().then(response => {
      return response.json();
    });
  }
  addVouchers(data, packageId): Promise<JSON> {

    const url = `im4booking/package/voucher`;
    const api_key = localStorage.getItem('api_key');
    const user_id = localStorage.getItem('user_id');

    const sdata = {
      'api_key': api_key,
      'user_id': user_id,
      'voucher': data,
      'package_id': packageId
    }
    
    return this.http.post(url, sdata).toPromise().then(response => {
      return response.json();
    });
  }
  getVoucher(package_id: string): Promise<any> {
    const url = `im4booking/package/voucher/${package_id}`;
    const api_key = localStorage.getItem('api_key');
    const user_id = localStorage.getItem('user_id');
    const headers = new Headers();

    headers.append('api_key', api_key);
    headers.append('user_id', user_id);

    const options = new RequestOptions({
      headers: headers
    });

    return this.http.get(url, options).toPromise().then(response => {
      return response.json();
    });
  }
  editVoucher(data, packge_id, voucherId): Promise<any> {
    const url = `im4booking/package/voucher/edit/`;
    const api_key = localStorage.getItem('api_key');
    const user_id = localStorage.getItem('user_id');

    const body = {
      'api_key': api_key,
      'user_id': user_id,
      'new_voucher': data,
      'package_id': packge_id,
      'voucher_id': voucherId
    }
    return this.http.post(url, body).toPromise().then(response => {
      return response.json();
    });
  }
  editPackage(data, packageId): Promise<any> {
    const url = `im4booking/package/edit/`;
    const api_key = localStorage.getItem('api_key');
    const user_id = localStorage.getItem('user_id');

    const body = {
      'api_key': api_key,
      'user_id': user_id,
      'new_package': data,
      'package_id': packageId
    }
    return this.http.post(url, body).toPromise().then(response => {
      return response.json();
    });
  }
  getVouchers(): Promise<any> {
    const url = `im4booking/package/voucher/`;
    const api_key = localStorage.getItem('api_key');
    const user_id = localStorage.getItem('user_id');
    const header = new Headers();
    header.append('api_key', api_key);
    header.append('user_id', user_id);
    const options = new RequestOptions({
      headers: header
    });
    return this.http.get(url, options).toPromise().then(response => {
      // console.log(response);
      return response['_body'];
    })
  }
  sendFile(offerId: string, files : File[]): void {
    const url = `/upload_pic/package`;
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
    formData.append('offer_id', offerId);
    formData.append('id', offerId);
    this.http.post(url, formData, options).subscribe();
  }

  sendFileImgVoucher(offerId: string, files : File[]): Promise<any> {
    const url = `/upload_pic/offer`;
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
    formData.append('offer_id', offerId);
    formData.append('id', offerId);
    return this.http.post(url, formData, options).toPromise().then(res => {
      return res;
    });
  }

  sendFilePDFVoucher(offerId: string, files : File[]): void {
    const url = `/upload_media/offer`;
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
    formData.append('offer_id', offerId);
    formData.append('id', offerId);
    this.http.post(url, formData, options).subscribe();
  }
  deletePackage(packId): Promise<any> {
    const url = `im4booking/package/delete`;
    const api_key = localStorage.getItem('api_key');
    const user_id = localStorage.getItem('user_id');
    const body = {
      'api_key': api_key,
      'user_id': user_id,
      'package_id': packId
    }
    return this.http.post(url, body).toPromise().then(res => {
      return res;
    });
  }

  deleteVoucher(packId): Promise<any> {
    const url = `im4booking/package/voucher/delete`;
    const api_key = localStorage.getItem('api_key');
    const user_id = localStorage.getItem('user_id');
    const body = {
      'api_key': api_key,
      'user_id': user_id,
      'voucher_id': packId
    }
    return this.http.post(url, body).toPromise().then(res => {
      return res;
    });
  }

  deactivatePackage(packId): Promise<any> {
    const url = `im4booking/package/deactivate`;
    const api_key = localStorage.getItem('api_key');
    const user_id = localStorage.getItem('user_id');
    const body = {
      'api_key': api_key,
      'user_id': user_id,
      'package_id': packId
    }
    return this.http.post(url, body).toPromise().then(res => {
      return res;
    });
  }
    activatePackage(packId): Promise<any> {
    const url = `im4booking/package/activate`;
    const api_key = localStorage.getItem('api_key');
    const user_id = localStorage.getItem('user_id');
    const body = {
      'api_key': api_key,
      'user_id': user_id,
      'package_id': packId
    }
    return this.http.post(url, body).toPromise().then(res => {
      return res;
    });
  }
}
