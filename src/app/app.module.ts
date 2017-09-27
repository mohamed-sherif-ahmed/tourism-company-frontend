import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MdCardModule } from '@angular/material';
import {MdButtonModule} from '@angular/material';
import {MdTabsModule} from '@angular/material';
import {MdInputModule} from '@angular/material';
import {MdFormFieldModule} from '@angular/material';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NewsComponent } from './news/news.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OfferComponent } from './offer/offer.component';
import { PackagesComponent } from './packages/packages.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { UsersComponent } from './users/users.component';
import {FeedbackService} from './feedback/feedback.service';
import {OfferService} from './offer/offer.service';
import {ConnectionBackend, Http, HttpModule} from '@angular/http';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http' ;
import {PackagesService} from './packages/packages.service';
import {MdCheckboxModule} from '@angular/material';
import { TermsandconditionsComponent } from './termsandconditions/termsandconditions.component';
import { FormsModule } from '@angular/forms';
import { FileSelectDirective } from 'ng2-file-upload';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    NewsComponent,
    DashboardComponent,
    OfferComponent,
    PackagesComponent,
    FeedbackComponent,
    UsersComponent,
    TermsandconditionsComponent,
    FileSelectDirective
  ],
  imports: [
    HttpClientModule,
    HttpModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MdCardModule,
    MdButtonModule,
    MdTabsModule,
    MdInputModule,
    MdFormFieldModule,
    HttpModule,
    MdCheckboxModule,
    RouterModule.forRoot([
      {
        path: 'news',
        component: NewsComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },
      {
        path: 'nav',
        component: NavigationComponent
      },
      {
        path: 'offer',
        component: OfferComponent
      },
      {
        path: 'packages',
        component: PackagesComponent
      },
      {
        path: 'feedback',
        component: FeedbackComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'term',
        component: TermsandconditionsComponent
      }
    ])
  ],
  providers: [FeedbackService, OfferService , HttpModule , HttpClient, PackagesService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
