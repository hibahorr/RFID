import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {User} from '../model';
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserService {
    API_LINK = 'http://localhost:3000';
    constructor(private http: HttpClient) { }

    getAll(): Observable<User[]>{
        return this.http.get<User[]>(this.API_LINK+`/users/`); 
    }

    register(user: User): Observable<any> {
        return this.http.post(this.API_LINK + `/register`, user);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(this.API_LINK + `/users/${id}`);
    }

    getById(id: number): Observable<User>{
        return this.http.get<User>(this.API_LINK + `/users/${id}`);
    }

    putOrPost(user: User): Observable<User> {
        if (user.id != null) {
            return this.http.put<User>(`${this.API_LINK}/users/`+user.id, user);
        }
        else {
            return this.http.post<User>(`${this.API_LINK}/users`, user);
        }
    }
}
