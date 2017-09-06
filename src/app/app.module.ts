import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { NavigationComponent } from './navigation/navigation.component';
import { NewsComponent } from './news/news.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OfferComponent } from './offer/offer.component';
import { PackagesComponent } from './packages/packages.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { UsersComponent } from './users/users.component';
import { FormsModule } from '@angular/forms';
<<<<<<< HEAD
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule , MdCardModule } from '@angular/material';
=======
>>>>>>> a4cd507b00e8e59964c61e52e0484fb0ec3a2547

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
    UsersComponent
  ],
  imports: [
    BrowserModule,
     FormsModule,
     BrowserAnimationsModule,
     MdButtonModule,
     MdCheckboxModule,
     MdCardModule,
     
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
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
