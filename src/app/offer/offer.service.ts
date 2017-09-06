import {Injectable} from '@angular/core';
import {Offer} from './Offer' ;
import {HttpClient} from '@angular/common/http';
import {RequestOptions} from "@angular/http";

@Injectable()
export class OfferService {
  constructor(private http: HttpClient) { }
}
