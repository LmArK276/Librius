import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { BookDetailed } from '../models/bookDetailed';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  myFavBooks$ = new BehaviorSubject<BookDetailed[]>([])
  myFavBooks = this.myFavBooks$.asObservable()

  token:string = ""
  headers = new HttpHeaders()

  constructor(private http:HttpClient, private cookie:CookieService) {
    if(this.cookie.check('token')){
      this.token= this.cookie.get('token')
      this.headers = this.headers.set("Authorization", "Bearer " + this.token)
      this.getFavorites()
    }
  }

  addFavBook(bookID:string){
      return this.http.post<any>(environment.apiUrl+"/user/addFavorite", {bookID: bookID}, {headers: this.headers})
  }

  checkFavorite(bookID:string){
    return this.http.post<any>(
      environment.apiUrl+"/user/checkFavorite",
      {bookID: bookID},
      {headers: this.headers}
    )
  }

  getFavorites(){

    return this.http.post<BookDetailed[]>(
      environment.apiUrl+"/user/getFavorites",
      {},
      {headers: this.headers}
    )
    .subscribe(favBooks=>{
      this.myFavBooks$.next(favBooks)
    })

  }

  removeFavorite(bookID:string){
    return this.http.post<any>(
      environment.apiUrl+"/user/removeFavorite",
      {bookID: bookID},
      {headers: this.headers}
    )
  }

}
