import { Component, OnInit } from '@angular/core';
import {FeedbackService} from './feedback.service';
import {Feedback} from './Feedback';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  constructor( private service: FeedbackService) { }
 feedbacks: Feedback[] ;
  ngOnInit() {
  }
  viewFeedbacks(): void {
    this.service.getFeedbacks().then((res) => {
      if (this.service.valid) {
        this.feedbacks = res;
      } else { // nzahrlo this.offerService.err fl UI
      }
    });
  }
}
