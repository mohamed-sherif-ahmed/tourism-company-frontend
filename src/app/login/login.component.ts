import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  show = true;
  showWrongUser = false;
  constructor(private http: Http, private router: Router) { }

  ngOnInit() {
  }

  login(username: string, password: string): void {
    this.loginService(username, password);
  }

  route(): void {
    this.router.navigateByUrl("offer");
  }
//user_name

  loginService(username: string, password: string): void {
    const url = '/im4booking/user/login';

    this.http.post(url, {
      'user_name': username,
      'password': password
    }).subscribe(res => {
      console.log(res);
      const body = JSON.parse(res['_body']);
      console.log(body);
      if (body['valid'] == true){
        const login_res = body['response'];
        localStorage.setItem('user_id', login_res['user_id']);
        localStorage.setItem('api_key', login_res['api_key']);
        if (login_res['new_user']){
          this.router.navigateByUrl("passRedirect");
        }
        this.router.navigateByUrl("offer");
      } else { 
        console.log("in else");
        this.showWrongUser = true;
      }
    });
  }
}
