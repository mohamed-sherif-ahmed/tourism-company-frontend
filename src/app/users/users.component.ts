import { Component, OnInit } from '@angular/core';

import { UserService } from './user.service';
import { PackagesService } from './../packages/packages.service';
import { package_json } from './../packages/package_json';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  changePassword = false;
  packagesArr: package_json [];

  constructor(private userService: UserService, private packageService: PackagesService) { }
  ngOnInit() {
    this.packageService.getPackages().then(res => {
      console.log(res);
      var body = JSON.parse(res);
      this.packagesArr = body['response'] as package_json [];
      console.log(this.packagesArr);
    });
  }
  showPasswordForm(): void {
    this.changePassword = true;
  }
  editPassword(userId: string): void {

  }
  deleteUser(userId: string): void {
    
  }
  addNewUser(userName: string, email: string, password: string, userStatus: string, clientStatus: string, phone: string, packageId: string): void {
    var data; 
    if (userStatus == "admin") {
      data = {
        'name': userName,
        'email': email,
        'password': password,
        'phone_number': phone,
        'user_type': userStatus,
        'packaged_used': packageId
      }
    } else {
      data = {
        'name': userName,
        'email': email,
        'password': password,
        'phone_number': phone,
        'client_type': clientStatus,
        'user_type': userStatus,
        'packaged_used': packageId
      }
    }
    
    console.log(data);
    this.userService.addNewUser(data);
  }
}
