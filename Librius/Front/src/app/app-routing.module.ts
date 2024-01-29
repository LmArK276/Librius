import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './components/book/book.component';
import { BooksComponent } from './components/books/books.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { LoginGuard } from './services/login.guard';
import { RegisterComponent } from './components/register/register.component';
import { BookPageComponent } from './components/book-page/book-page.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

const routes: Routes = [
  {path:"login", component:LoginComponent, canActivate:[LoginGuard]},
  {path:"register", component:RegisterComponent, canActivate:[LoginGuard]},
  {path:"", redirectTo:"/books", pathMatch:"full"},
  {path:"books", component:BooksComponent},
  {path:"book-details/:id", component:BookPageComponent},
  {path:"favorites", component:FavoritesComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
