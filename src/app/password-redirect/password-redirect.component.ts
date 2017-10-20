import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-password-redirect',
  templateUrl: './password-redirect.component.html',
  styleUrls: ['./password-redirect.component.css']
})
export class PasswordRedirectComponent implements OnInit {

  constructor(private router: Router, private http: Http) { }

  ngOnInit() {
  }

  changePassword(pass: string): void {
    console.log(pass);
    const url = `im4booking/user/change_password`;
    const api_key = localStorage.getItem('api_key');
    const user_id = localStorage.getItem('user_id');
    this.http.post(url, {
        'api_key': api_key,
        'target_userid': user_id,
        'new_password': pass
    }).subscribe(res => {
      const r = JSON.parse(JSON.stringify(res));
      const body = r['body'];
      if (body['valid'] == true) {
        this.router.navigateByUrl("offer");
      }
    });

  }

}
