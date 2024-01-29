import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BooksService } from 'src/app/services/books.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  genreList = [
    "Action",
    "Adventure",
    "Biography",
    "Children",
    "Comedy",
    "Crime",
    "Drama",
    "Fantasy",
    "Historical",
    "Horror",
    "Mystery",
    "Science Fiction",
    "Thriller"
  ]

  currGenre:any
  titleSearchWord:string = ""
  currUsername = ""

  constructor(private bookService:BooksService, private auth: AuthService ,private router: Router) {
  }



  ngOnInit(): void {
    this.bookService.liveCurrGenre.subscribe(currGenre=>{
      this.currGenre = currGenre
    })

    this.auth.getUserData()

    this.auth.name.subscribe(name=>{
      this.currUsername = name
    })
  }

  handleGenreClick(genre:string)
  {
    this.bookService.getAndRefreshBooks(1, genre)
    this.bookService.currentGenreSub.next(genre)
    this.bookService.currPage.next(1)
  }

  checkIfNotOnBooks() : boolean
  {

    return this.router.routerState.snapshot.url.split("/")[1] != "books"
  }

  searchByTitle()
  {

    if(this.titleSearchWord == "" || this.titleSearchWord == undefined)
    {
      this.bookService.liveCurrSearchKeyword.subscribe(res=>{
        this.titleSearchWord = res
      })
    }
    else
    {
      this.bookService.currentSearchKeyword.next(this.titleSearchWord)
    }

    this.bookService.getAndRefreshBooks(1, "Any", this.titleSearchWord, true)
  }

  loginNav()
  {
    this.router.navigate(['login'])
  }

  logout()
  {
    this.auth.logout()
  }
}
