import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/services/books.service';
import { LoaderService } from 'src/app/services/loader.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books : Book[] = [];
  isLoading : Subject<boolean> = this.loaderService.isLoading

  currentPage:any;
  totalItems = 0;
  currGenre:any //za pagination jer se ne paignacija vrsi nad istim zanrom

  constructor(private bookService:BooksService, private loaderService:LoaderService) { }

  ngOnInit(): void {

    this.bookService.liveUpdateBooks.subscribe(books=>{
      this.books = books
    })

    this.bookService.liveNumItems.subscribe(numItems=>{
      this.totalItems = numItems
    })

    this.bookService.liveCurrGenre.subscribe(currGenre=>{
      this.currGenre = currGenre
    })


    this.bookService.liveCurrPage.subscribe(currPage=>{
      this.currentPage = currPage
    })

    this.bookService.getAndRefreshBooks(this.currentPage, this.currGenre)

  }


  changePage(newPage:number){
    this.bookService.currPage.next(newPage)
    this.bookService.getAndRefreshBooks(this.currentPage, this.currGenre)
  }

}
