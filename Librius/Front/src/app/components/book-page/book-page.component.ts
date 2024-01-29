import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject, delay } from 'rxjs';
import { BookDetailed } from 'src/app/models/bookDetailed';
import { AuthService } from 'src/app/services/auth.service';
import { BooksService } from 'src/app/services/books.service';
import { LoaderService } from 'src/app/services/loader.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit {

  isLoading : Subject<boolean> = this.loaderService.isLoading
  bookID = ""
  book?:BookDetailed
  isFavorite$ = new BehaviorSubject<boolean>(false)
  currEmail:string = ""


  constructor(
    private activatedRoute:ActivatedRoute,
    private bookService:BooksService,
    private loaderService:LoaderService,
    private userService:UserService,
    private authService:AuthService
  )
  {
    this.activatedRoute.paramMap.subscribe(params=>{
       this.bookID = params.get('id')!
    })

  }

  ngOnInit(): void {
    this.bookService.getSingleBook(this.bookID).subscribe(bookDetails=>{
      this.book = bookDetails
    })

    this.userService.checkFavorite(this.bookID).subscribe((res:boolean)=>{
      this.isFavorite$.next(!res)
    })

    this.authService.email.subscribe((res:string)=>{
      this.currEmail = res
    })

  }

  addFavorite(){
    this.userService.addFavBook(this.bookID).subscribe(res=>{
      if(res.message == "Fav book added")
      {
        this.userService.checkFavorite(this.bookID).subscribe((res:boolean) =>{
          this.isFavorite$.next(!res)
          this.userService.getFavorites()

        })
      }
    })
  }

  removeFavorite(){
    this.userService.removeFavorite(this.bookID).subscribe(resDeletion=>{

      this.userService.checkFavorite(this.bookID).subscribe((res:boolean) =>{
        this.isFavorite$.next(!res)
        this.userService.getFavorites()

      })
    })
  }
}
