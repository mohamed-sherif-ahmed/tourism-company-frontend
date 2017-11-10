import { Component, OnInit } from '@angular/core';

import { OfferRequest } from './request';
import { RequestService } from './requests.service';
import { OfferService } from './../offer/offer.service';
import { PackagesService } from './../packages/packages.service';
import { UserService } from './../users/user.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  acceptedArray: Array<OfferRequest> = new Array();
  rejectedArray: Array<OfferRequest> = new Array();
  user: any;
  pendingArray: Array<OfferRequest> = new Array();
  constructor(private requestService: RequestService, private userService: UserService) { }

  ngOnInit() {
    this.requestService.getAvailableRequests().then(res => {
      console.log(res);
      const body = res['response'];
      const acArray = body['accepted'];
      const rejArray = body['rejected'];
      const pendArray = body['pending'];

      acArray.forEach(req => {
        if ( req['request_type'] == "offer") {
          this.userService.getUser(req.user).then(res => {
            console.log("Comp " , res);
            this.user = res['response'];
            console.log("USER ", this.user);
            const newRequest = { 
              'user': this.user.name,
              'offer': req.offer.name[0].value,
              'state': req.state,
              'request_type': req.request_type,
              'request_date': req.request_date,
              'id': req._id,
              'img': req.offer.img_path
            }
            this.acceptedArray.push(newRequest);
            console.log("ARR", this.pendingArray);
          });
        } else if (req['request_type'] == "voucher") {
          this.userService.getUser(req.user).then(res => {
            console.log("Comp " , res);
            this.user = res['response'];
            console.log("USER ", this.user);
            const newRequest = { 
              'user': this.user.name,
              'offer': req.voucher.name[0].value,
              'state': req.state,
              'request_type': req.request_type,
              'request_date': req.request_date,
              'id': req._id,
              'img': req.voucher.img_path
            }
            this.acceptedArray.push(newRequest);
            console.log("ARR", this.pendingArray);
          });
        } else {
          this.userService.getUser(req.user).then(res => {
            console.log("Comp " , res);
            this.user = res['response'];
            console.log("USER ", this.user);
            const newRequest = { 
              'user': this.user.name,
              'offer': req.package.name[0].value,
              'state': req.state,
              'request_type': req.request_type,
              'request_date': req.request_date,
              'id': req._id,
              'img': req.package.img_path
            }
            this.acceptedArray.push(newRequest);
            console.log("ARR", this.pendingArray);
          });
        }
      });

      pendArray.forEach(req => {
        if ( req['request_type'] == "offer") {
          this.userService.getUser(req.user).then(res => {
            console.log("Comp " , res);
            this.user = res['response'];
            console.log("USER ", this.user);
            const newRequest = { 
              'user': this.user.name,
              'offer': req.offer.name[0].value,
              'state': req.state,
              'request_type': req.request_type,
              'request_date': req.request_date,
              'id': req._id,
              'img': req.offer.img_path
            }
            this.pendingArray.push(newRequest);
            console.log("ARR", this.pendingArray);
          });
        } else if (req['request_type'] == "voucher") {
          this.userService.getUser(req.user).then(res => {
            console.log("Comp " , res);
            this.user = res['response'];
            console.log("USER ", this.user);
            const newRequest = { 
              'user': this.user.name,
              'offer': req.voucher.name[0].value,
              'state': req.state,
              'request_type': req.request_type,
              'request_date': req.request_date,
              'id': req._id,
              'img': req.voucher.img_path
            }
            this.pendingArray.push(newRequest);
            console.log("ARR", this.pendingArray);
          });
        } else {
          this.userService.getUser(req.user).then(res => {
            console.log("Comp " , res);
            this.user = res['response'];
            console.log("USER ", this.user);
            const newRequest = { 
              'user': this.user.name,
              'offer': req.package.name[0].value,
              'state': req.state,
              'request_type': req.request_type,
              'request_date': req.request_date,
              'id': req._id,
              'img': req.package.img_path
            }
            this.pendingArray.push(newRequest);
            console.log("ARR", this.pendingArray);
          });
        }
      });

      rejArray.forEach(req => {
        if ( req['request_type'] == "offer") {
          this.userService.getUser(req.user).then(res => {
            console.log("Comp " , res);
            this.user = res['response'];
            console.log("USER ", this.user);
            const newRequest = { 
              'user': this.user.name,
              'offer': req.offer.name[0].value,
              'state': req.state,
              'request_type': req.request_type,
              'request_date': req.request_date,
              'id': req._id,
              'img': req.offer.img_path
            }
            this.rejectedArray.push(newRequest);
            console.log("ARR", this.pendingArray);
          });
        } else if (req['request_type'] == "voucher") {
          this.userService.getUser(req.user).then(res => {
            console.log("Comp " , res);
            this.user = res['response'];
            console.log("USER ", this.user);
            const newRequest = { 
              'user': this.user.name,
              'offer': req.voucher.name[0].value,
              'state': req.state,
              'request_type': req.request_type,
              'request_date': req.request_date,
              'id': req._id,
              'img': req.voucher.img_path
            }
            this.rejectedArray.push(newRequest);
            console.log("ARR", this.pendingArray);
          });
        } else {
          this.userService.getUser(req.user).then(res => {
            console.log("Comp " , res);
            this.user = res['response'];
            console.log("USER ", this.user);
            const newRequest = { 
              'user': this.user.name,
              'offer': req.package.name[0].value,
              'state': req.state,
              'request_type': req.request_type,
              'request_date': req.request_date,
              'id': req._id,
              'img': req.package.img_path
            }
            this.rejectedArray.push(newRequest);
            console.log("ARR", this.pendingArray);
          });
        }
      });
    });
  }

  rejectRequest(id: string): void {
    this.requestService.changeRequestStatus(id, "rejected");
  }

  acceptRequest(id: string): void {
    this.requestService.changeRequestStatus(id, "accepted");
  }

  changeToPending(id: string): void {
    this.requestService.changeRequestStatus(id, "pending");
  }
}
