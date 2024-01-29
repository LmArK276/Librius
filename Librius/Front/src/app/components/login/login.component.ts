import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string = ""
  password:string = ""

  constructor(private authService: AuthService, private cookie:CookieService, private router: Router, private userService:UserService) { }

  showPassword = false;

  ngOnInit(): void {
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  login(): void {
    if (this.email && this.password) {

      this.authService.login(this.email,this.password).subscribe(token => {
        this.cookie.set("token",token.token)
        this.authService.getUserData()
        this.userService.getFavorites()
        this.router.navigate([""])
      })

    } else {
      console.log('Email and password are required');
    }
  }



}
