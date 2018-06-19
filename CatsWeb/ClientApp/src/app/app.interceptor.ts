import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Skip auth for login requests
    if (request.url.toLowerCase().endsWith('token')) {
      return next.handle(request);
    }
    const clonedRequest = request.clone({ headers: request.headers.set('Authorization', `Bearer ${localStorage.getItem('id_token')}`) });

    return next.handle(clonedRequest)
    .pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log(`{url}=${event.url} {status}=${event.status}`);
        }
        return event;
      })
    );
  }
}

