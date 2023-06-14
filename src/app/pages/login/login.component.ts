import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData = {
    username: '',
    password: '',
  };

  constructor(
    private snack: MatSnackBar,
    private login: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  formSubmit() {
    console.log('login button clicked');

    if (
      this.loginData.username.trim() == '' ||
      this.loginData.username == null
    ) {
      this.snack.open('Username is required!!', '', {
        duration: 3000,
      });
      return;
    }
    if (
      this.loginData.password.trim() == '' ||
      this.loginData.password == null
      // this.loginData.password != this.loginData.password
    ) {
      this.snack.open('Password is required!!', '', {
        duration: 3000,
      });
      return;
    }

    // request to server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log('success');
        console.log(data);

        // login...
        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe((user: any) => {
          this.login.setUserDetails(user);
          console.log(user);

          // redirect.. admin role admin dashboard
          // redirect ole normal to normal user dashboard
          if (this.login.getUserRole() == 'ADMIN') {
            // admin dashboard
            // window.location.href = '/admin';
            this.router.navigate(['admin/listFile']);
            this.login.loginStatusSubject.next(true);
          } else if (this.login.getUserRole() == 'NORMAL') {
            // user-dashboard
            // window.location.href = '/user-dashboard';
            this.router.navigate(['user-dashboard']);
            this.login.loginStatusSubject.next(true);
          } else {
            this.login.logout();
            // location.reload();
          }
        });
      },

      (error) => {
        // if (this.loginData.password != this.loginData.password) {
        //   this.snack.open('Wrong password!!', '', {
        //     duration: 3000,
        //   });
        // }
        console.log('Error !');
        console.log(error);
        this.snack.open('Invalid details!! Try again', '', {
          duration: 3000,
        });
      }
    );
  }
}
