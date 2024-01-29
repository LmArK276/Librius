import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/app/models/book';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  @Input() book? : Book;

  bookImages:any
  noImagePath = 'assets/imgs/no_cover.jpg'

  constructor(private router:Router) { }


  ngOnInit(): void {
    this.bookImages = this.book!.images
  }

  showBookDetails()
  {
    this.router.navigate(['book-details', this.book?.id])
  }



}
