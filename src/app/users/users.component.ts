import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './user.service';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { PackagesService } from './../packages/packages.service';
import { package_json } from './../packages/package_json';
import { user_json } from './user_json';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  changePassword = false;
  packagesArr: package_json [];
  userForm: FormGroup;
  userFormEdit: FormGroup;
  editUser: string;
  usersArr: user_json[];
  user: user_json;

  constructor(private userService: UserService, private packageService: PackagesService, private router: Router) { }
  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl(),
      userName: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      phoneNumber: new FormControl(),
      adminStatus: new FormControl(),
      packageId: new FormControl()
    });

    this.userFormEdit = new FormGroup({
      name: new FormControl(''),
      userName: new FormControl(''),
      password: new FormControl(''),
      email: new FormControl(),
      phoneNumber: new FormControl(''),
      adminStatus: new FormControl(''),
      packageId: new FormControl('')
    });

    this.packageService.getPackages().then(res => {
      console.log(res);
      var body = JSON.parse(res);
      this.packagesArr = body['response'] as package_json [];
      console.log(this.packagesArr);
      this.userService.getAvailableUsers().then(res => {
        console.log("NASDNASD" + res);
        console.log("");
        console.log("RES", res['response']);
        console.log("");
        this.usersArr = res['response'] as user_json [];
        this.usersArr = this.usersArr.map(user => {
          user.edit_enabled = false;
          if (user.user_type == "admin") {
            user.user_status = "Admin";
          }else if (user.user_type == "client" && user.client_type == "guest"){
            user.user_status = "Guest";
          }else {
            console.log("PACKAGEARR", this.packagesArr);
            var pack = this.packagesArr.filter(pac => {
              console.log("PAC IN LOOP", pac);
              console.log("ID", user.packaged_used);
              if (user.packaged_used == pac._id){
                return pac;
              }
            });
            console.log("PAC SELECTED", pack);
            if (pack.length == 0){
              console.log("IN NO PACKAGE", pack);
              user.user_status = "Package Deleted";
            } else {
              console.log("IN PACKAGE", pack);
              user.user_status = pack[0].name[0].value;
            }

          }
          return user;
        });
      });
    });
  }
  showPasswordForm(id): void {
    this.changePassword = true;
    this.editUser = id;

    let user = this.usersArr.filter(user => {
      if (this.editUser == user._id) {
        return user;
      }
    });

    console.log("USER USER USER EDIT " + user);
    this.user = user[0];
    this.usersArr = this.usersArr.map(user => {
      if (this.editUser == user._id){
        user.edit_enabled = true;
      }
      return user;
    });

    this.userFormEdit.patchValue({
      name: this.user.name,
      userName: this.user.username,
      password: this.user.password,
      email: this.user.email,
      phoneNumber: this.user.phone_number,
      adminStatus: this.user.user_type,
      packageId: this.user.packaged_used
    });
  }
  editPassword(userId: string): void {

  }
  deleteUser(userId: string): void {
    this.userService.deleteUser(userId);
  }
  submitUser(): void {
    var data;
    console.log(this.userForm.value.packageId);
    if (this.userForm.value.adminStatus == "admin") {
      data = {
        'name': this.userForm.value.name,
        'username': this.userForm.value.userName,
        'email': this.userForm.value.email,
        'password': this.userForm.value.password,
        'phone_number': this.userForm.value.phoneNumber,
        'user_type': this.userForm.value.adminStatus
      }
    } else if (this.userForm.value.adminStatus == "client" && (this.userForm.value.packageId == "" || this.userForm.value.packageId == null)) {
      data = {
        'name': this.userForm.value.name,
        'username': this.userForm.value.userName,
        'email': this.userForm.value.email,
        'password': this.userForm.value.password,
        'phone_number': this.userForm.value.phoneNumber,
        'user_type': this.userForm.value.adminStatus,
        'client_type': 'guest'
      }
    } else if (this.userForm.value.adminStatus == "client" && (this.userForm.value.packageId != "" || this.userForm.value.packageId != null)) {
      data = {
        'name': this.userForm.value.name,
        'username': this.userForm.value.userName,
        'email': this.userForm.value.email,
        'password': this.userForm.value.password,
        'phone_number': this.userForm.value.phoneNumber,
        'user_type': this.userForm.value.adminStatus,
        'client_type': 'logged_in',
        'packaged_used': this.userForm.value.packageId
      }
    }
    console.log(data);
    this.userService.addNewUser(data).then(status => {
      const body = JSON.parse(status['_body']);
      if (body.valid == true){
        this.userForm.reset();
      }
    });
  }
  submitUserEdit(): void {
    var data;
    console.log(this.userForm.value.packageId);
    if (this.userFormEdit.value.adminStatus == "admin") {
      data = {
        'name': this.userFormEdit.value.name,
        'email': this.userFormEdit.value.userName,
        'password': this.userFormEdit.value.password,
        'phone_number': this.userFormEdit.value.phoneNumber,
        'user_type': this.userFormEdit.value.adminStatus
      }
    } else if (this.userFormEdit.value.adminStatus == "client" && (this.userFormEdit.value.packageId == "" || this.userFormEdit.value.packageId == null )) {
      data = {
        'name': this.userFormEdit.value.name,
        'username': this.userFormEdit.value.userName,
        'email': this.userFormEdit.value.email,
        'password': this.userFormEdit.value.password,
        'phone_number': this.userFormEdit.value.phoneNumber,
        'user_type': this.userFormEdit.value.adminStatus,
        'client_type': 'guest'
      }
    } else if (this.userFormEdit.value.adminStatus == "client" && (this.userFormEdit.value.packageId != "" || this.userFormEdit.value.packageId != null)) {
      data = {
        'name': this.userFormEdit.value.name,
        'email': this.userFormEdit.value.userName,
        'password': this.userFormEdit.value.password,
        'phone_number': this.userFormEdit.value.phoneNumber,
        'user_type': this.userFormEdit.value.adminStatus,
        'client_type': 'logged_in',
        'packaged_used': this.userFormEdit.value.packageId
      }
    }
    console.log("DATA EDIT USER" + data);
    this.userService.editUser(data, this.editUser).then(res => {
      this.router.navigateByUrl("offer");
    });
  }
}
