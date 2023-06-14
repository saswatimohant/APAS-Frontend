import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/services/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css'],
})
export class ListuserComponent implements OnInit {
  users: User[] = [];

  constructor(private userserivice: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getUser();
  }

  private getUser() {
    this.userserivice.getUserList().subscribe((data) => {
      
      this.users = data;
      console.log(this.users)
     
    });
  }
}
