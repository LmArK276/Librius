import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Book } from 'src/app/models/book';
import { BookDetailed } from 'src/app/models/bookDetailed';
import { LoaderService } from 'src/app/services/loader.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  books : BookDetailed[] = [];
  isLoading : Subject<boolean> = this.loaderService.isLoading
  noImagePath = 'assets/imgs/no_cover.jpg'

  constructor(
    private loaderService:LoaderService,
    private userService:UserService,
    private router:Router
  )
  { }

  ngOnInit(): void {
    this.userService.myFavBooks.subscribe(books=>{
      this.books = books
    })
  }

  showBookDetails(bookID:string)
  {
    this.router.navigate(['book-details', bookID])
  }

}
