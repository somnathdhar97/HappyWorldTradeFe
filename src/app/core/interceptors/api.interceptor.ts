import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
// import { LoadingIndeterminateService } from '../layout/service/loading-indeterminate.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  // constructor(private loadingIndeterminate:LoadingIndeterminateService) {}
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    // this.loadingIndeterminate.showLoading();
    const baseURL = environment.BaseURL;
    if(token){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        },
        url: `${baseURL}${request.url}`
      });
    }else{
      request = request.clone({ url: `${baseURL}${request.url}` });
    }

    return next.handle(request).pipe(
      finalize(() => {
        // this.loadingIndeterminate.hideLoading(); // Hide the loading indicator when the response is received
      })
    );
  }
}
