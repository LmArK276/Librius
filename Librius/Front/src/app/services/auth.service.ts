import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Token } from '../models/token';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  name$ = new BehaviorSubject<string>("")
  email$ = new BehaviorSubject<string>("")

  email = this.email$.asObservable()
  name = this.name$.asObservable()

  constructor(private httpClient:HttpClient, private cookie: CookieService, private router:Router) { }

  register(email:string, name:string ,password:string)
  {
    return this.httpClient.post<Token>(environment.apiUrl+"/auth/register",{
      email:email,
      name:name,
      password:password
    })
  }

  login(email:string, password:string)
  {
    return this.httpClient.post<Token>(environment.apiUrl+"/auth/login",{
      email: email,
      password : password
    })
  }

  validateJwt(token:String):Observable<boolean>
  {
    let headers = new HttpHeaders().set("Authorization", "Bearer "+token)
    return this.httpClient.post<boolean>(environment.apiUrl+"/auth/validate",{}, {headers : headers});
  }

  getUserData()
  {

    var token = ""

    if(this.cookie.check('token')){
      token= this.cookie.get('token')
    }
    else{
      return
    }

    let headers = new HttpHeaders().set("Authorization", "Bearer "+token)
    this.httpClient.post<any>(environment.apiUrl+"/auth/getUserData", {}, {headers: headers}).subscribe(res=>{
      if(res != "Unauthorized")
      {
        this.email$.next(res.email)
        this.name$.next(res.name)
      }
    })

  }

  logout()
  {
    this.cookie.delete("token")
    this.name$.next("")
    this.email$.next("")
    this.router.navigate([""])
  }
}




