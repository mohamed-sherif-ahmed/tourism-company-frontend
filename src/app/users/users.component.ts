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
  addNewUser(userName: string, email: string, password: string): void {
    console.log("5ara hena");
    this.userService.addNewUser(email, password, userName);
  }
}
