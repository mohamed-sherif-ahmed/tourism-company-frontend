import { Component, OnInit } from '@angular/core';

import { OfferRequest } from './request';
import { RequestService } from './requests.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  requestArr: JSON[];
  constructor(private requestService: RequestService) { }

  ngOnInit() {
    this.requestService.getAvailableRequests().then(res => this.requestArr = res);
  }

  deleteRequest(id: string): void {
    this.requestService.changeRequestStatus(id, "delete");
  }

  acceptRequest(id: string): void {
    this.requestService.changeRequestStatus(id, "accept");
  }
}
