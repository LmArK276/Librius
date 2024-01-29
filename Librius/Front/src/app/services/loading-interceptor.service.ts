import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptorService {

  constructor(private loaderService:LoaderService) { }

  intercept(request: HttpRequest<unknown>, next:HttpHandler): Observable<HttpEvent<unknown>>
  {
    const requestUrl = request.url;
    if (requestUrl.includes('/user')) {
      return next.handle(request); //da se vrati ako ide ka useru koji je na localu, ne treba nam spinner ako je toliko brzo
    }

    this.loaderService.show()
  
    return next.handle(request).pipe(
      finalize(() => this.loaderService.hide())
    )
  }
}
