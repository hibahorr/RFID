import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../model';

const helper = new JwtHelperService();


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private SERVER_URL = "http://localhost:3000";
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    // TODO: rebuild user from validated token
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(this.SERVER_URL + `/login`, { email, password })
    .pipe(map(response => {
      let user = new User;
      if (response && response.accessToken) {
        let decodedToken = helper.decodeToken(response.accessToken);
        user.token  = response.accessToken;
        user.email  = decodedToken.email;
        user.id     = Number(decodedToken.sub);
        localStorage.setItem('currentUser', JSON.stringify(user));
        sessionStorage.setItem('id',String(user.id));
        this.currentUserSubject.next(user);
      }

      return user;
    }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
