import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Post} from "../model/post";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  API_LOCATION = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  createOrUpdate(post: Post): Observable<Post> {
    if (post.id != null) {
      return this.http.put<Post>(`${this.API_LOCATION}posts/`+post.id, post);
    }
    else {
      return this.http.post<Post>(`${this.API_LOCATION}posts`, post);
    }
  }
  findAll(): Observable<Post[]>{
    return this.http.get<Post[]>(`${this.API_LOCATION}posts`);
  }

  findById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.API_LOCATION}posts/`+ id);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.API_LOCATION}posts/` + id);
  }
}
