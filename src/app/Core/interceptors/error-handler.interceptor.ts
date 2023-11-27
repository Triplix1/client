import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router } from '@angular/router';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // return next.handle(request).pipe(
    //   catchError((error: HttpErrorResponse) => {
    //     let errorMessage = '';
    //     if (error.error instanceof ErrorEvent) {
    //       // client-side error
    //       errorMessage = `Error: ${error.error.message}`;
    //     } else {
    //       // server-side error
    //       errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
    //     }
    //     // Here you can also add your spinner logic
    //     this.toastrService.error(errorMessage, 'Error Occurred');
    //     return throwError(errorMessage);
    //   })
    // );

    return next.handle(request).pipe(
      catchError(error => {
        if (error) {
          switch (error.status) {
            case 400:
              if (error.error.errors) {
                const modelStateErrors = [];
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    modelStateErrors.push(error.error.errors[key])
                  }
                }
                throw modelStateErrors.flat();
              } else {
                this.toastr.error(error.error, error.status);
              }
              break;
            case 401:
              this.toastr.error('Unauthorised', error.status);
              break;
            case 404:
              this.router.navigateByUrl('/not-found');
              break;
            case 500:
              const navigationExtras: NavigationExtras = { state: { error: error.error } };
              this.router.navigateByUrl('/server-error', navigationExtras);
              break;
            default:
              this.toastr.error('Something unexpected went wrong');
              console.log(error);
              break;
          }
        }
        throw error;
      })
    )
  }
}
