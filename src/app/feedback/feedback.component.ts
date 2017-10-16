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
 esponse : any ;
  ngOnInit() {
  this.viewFeedbacks();
  }
  viewFeedbacks(): void {
    this.service.getFeedbacks().then((res) => {
      this.esponse = JSON.parse(res)['response'] ;
      if (JSON.parse(res)['valid']) {
        this.feedbacks=this.esponse['data'] as Feedback[];

      }
       else { // nzahrlo this.offerService.err fl UI
      }
    });
  }

  delete(name:string){
    this.service.delFeedbacks(name);
  }

}
