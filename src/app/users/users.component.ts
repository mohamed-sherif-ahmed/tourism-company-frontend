import { Component, OnInit } from '@angular/core';

import { UserService } from './user.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  changePassword = false;
  
  constructor(private userService: UserService) { }
  ngOnInit() {
  }
  showPasswordForm(): void {
    this.changePassword = true;
  }
  editPassword(userId: string): void {

  }
  deleteUser(userId: string): void {
    
  }
  addNewUser(userName: string, email: string, password: string, userStatus: string, clientStatus: string, phone: string): void {
    var data; 
    if (userStatus == "admin") {
      data = {
        'name': userName,
        'email': email,
        'password': password,
        'phone_number': phone,
        'user_type': userStatus
      }
    } else {
      data = {
        'name': userName,
        'email': email,
        'password': password,
        'phone_number': phone,
        'client_type': clientStatus,
        'user_type': userStatus
      }
    }
    
    console.log(data);
    this.userService.addNewUser(data);
  }
}
