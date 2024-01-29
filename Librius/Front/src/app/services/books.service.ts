import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Book } from '../models/book';
import { BehaviorSubject } from 'rxjs';
import { BookDetailed } from '../models/bookDetailed';

@Injectable({
  providedIn: 'root'
})

export class BooksService {

  booksArray: Book[] = []//samo za inicijalizaciju subjecta, posle se knjige salju kroz subject

  booksChanged: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>(this.booksArray);
  liveUpdateBooks = this.booksChanged.asObservable();

  currentGenreSub = new BehaviorSubject<string>("Action")
  numItemsSub = new BehaviorSubject<number>(0)
  currPage = new BehaviorSubject<number>(1)
  currentSearchKeyword = new BehaviorSubject<string>("")

  liveNumItems = this.numItemsSub.asObservable()
  liveCurrGenre = this.currentGenreSub.asObservable()
  liveCurrPage = this.currPage.asObservable()
  liveCurrSearchKeyword = this.currentSearchKeyword.asObservable()

  constructor(private http: HttpClient) {
  }

  getAndRefreshBooks(pageNum:number, genre:string , searchKeyword="", searchFlag=false)
  {
    let query = "/books/"+pageNum+"/"+genre

    let oldSearchKeyword = ""

    this.liveCurrSearchKeyword.subscribe(res=>{
      oldSearchKeyword = res
    })

    if(oldSearchKeyword != "" && genre == "Any")
    {
      query = "/books/"+pageNum+"/"+genre+"/"+encodeURIComponent(oldSearchKeyword)+"/"+searchFlag
    }

    if(searchFlag)
    {
      query = "/books/"+pageNum+"/"+genre+"/"+encodeURIComponent(searchKeyword)+"/"+searchFlag
      this.currentSearchKeyword.next(searchKeyword)
    }

    if(genre != "Any")
    {
      this.currentSearchKeyword.next("")
    }

    this.http.get<any>(environment.apiUrl+query).subscribe(res =>{
      this.booksChanged.next(res.books as Book[]);
      this.currentGenreSub.next(genre)
      this.numItemsSub.next(res.totalItems)
      if(res.books == undefined)
        return
    })
  }

  getSingleBook(bookID:string)
  {
    return this.http.get<BookDetailed>(environment.apiUrl+"/books/"+bookID)
  }

}



