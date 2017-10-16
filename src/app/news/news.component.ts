import { Component, OnInit } from '@angular/core';
import {News} from './news';
import {NewsService} from './news.service';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.less']
})
export class NewsComponent /*implements OnInit*/ {
  constructor(private newsService: NewsService) { }
  file: FileList;
 newsArray: News[];
 neededDate: Date;
  data: {} ;
  error: {};
  files:any ;
  selectedNews: News;
  addedNews:News;
  ngOnInit() {
    console.log(this.neededDate);
    this.viewNews(this.neededDate) ;
  }
  viewNews(date: Date ): void {
    this.newsService.getNews( date ).then((res) => {
      if (this.newsService.valid) {
        this.newsArray = res;
      } else { // nzahrlo this.offerService.err fl UI
          }
    });
  }
  sumbitdateclicked(year , month , day){
    this.neededDate = new Date (year , month , day)
    console.log(this.neededDate);
    this.viewNews(this.neededDate) ;
  }
  viewnew(id: string , long: number): void {
    this.newsService.getNew( id  ).then((res) => {
      if (this.newsService.valid) {
        this.selectedNews = res;
      } else { // nzahrlo this.offerService.err fl UI
      }
    });
  }
createNews(title , id , body , date){
  this.addedNews = new News(title , id , body , date);
  console.log(this.addedNews); 
    this.newsService.addNews(this.addedNews);

}
delete (title:string){
  this.newsService.delNews(title);
}
  pdfHandler(event): void {
    console.log('pdfhandler called');
    this.files = event.target.files ;

  }
  test(): void {
    console.log('sdfdsss');
  }
}
