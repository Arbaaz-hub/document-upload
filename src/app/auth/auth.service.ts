import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private token: string = '';
  private tokenTimer: any;
  private userId: any = '';
  private authStatusListener = new Subject<boolean>();
  createdBy = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }

  //This is used to signup the user.
  signup(signUpData: any) {
   return this.http.post<AuthResponseData>(environment?.authURL + 'signUp?key=AIzaSyBgVNJUqAVERCd8oywT0-mJTn0pTNi_L8M',
      signUpData)
      .pipe(
        catchError(this.handleError),
        tap(res => {
          
        })
      );
  }
  
  //This is used to login the user.
  login(loginData: any) {
   return this.http.post<AuthResponseData>(environment?.authURL + 'signInWithPassword?key=AIzaSyBgVNJUqAVERCd8oywT0-mJTn0pTNi_L8M',
      loginData).pipe(
        catchError(this.handleError),
        tap(res => {
          const token = res.idToken;
          this.token = token;
          if (token) {
            const expiresInDuration: any = res.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = res.localId;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
            this.createdBy.next(this.userId)
            this.saveAuthData(token, expirationDate, this.userId);
            this.router?.navigate(['/dashboard']);
          }
        })
      );
  }

  //This is used to handle server errors
  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'Your account is blocked because of too many attempts.';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }

  //This is used for autologin when token is not expired.
  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      this.router.navigate(['/login'])
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.router.navigate(['/dashboard'])
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  //This is used to check user is uthenticated or not.
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  //This is used to get authenticated user data.
  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    }
  }

  //This is used to set auth timer.
  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  //Used to logout the user.
  logout() {
    this.token = '';
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = '';
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/login"]);
    this.toastr.success('Logged out successfully!')
  }

  //Used to clear auth data.
  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }

  //Used to save authenticated uses data.
  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
  }

  getIsAuth() {
    return this.isAuthenticated;
  }
}
