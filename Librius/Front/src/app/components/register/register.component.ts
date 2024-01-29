import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email:string = ""
  name:string = ""
  password:string = ""

  showPassword = false;

  constructor(private authService:AuthService, private cookieService:CookieService, private router:Router) { }

  ngOnInit(): void {
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  register(): void {
    if (this.email && this.name && this.password) {

      this.authService.register(this.email,this.name,this.password).subscribe(token=>{
        this.cookieService.set("token", token.token)
        this.authService.getUserData()
        this.router.navigate([""])
      })
    } else {
      alert('Please fill in all fields');
    }
  }

}


