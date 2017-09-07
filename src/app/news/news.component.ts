import { Component, OnInit } from '@angular/core';
import {News} from './news';
import {NewsService} from './news.service';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent /*implements OnInit*/ {

  /*constructor() { }

  ngOnInit() {
  }*/
  
  /*newsArr:News[];
  constructor (private newsService: NewsService) { }
  viewNews():void{
    this.newsService.getNews().then(arr => {
      this.newsArr=arr;
    });
    
  }*/

}
