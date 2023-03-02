import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Post } from '../post';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PostService {
  private postUrl = "http://localhost:7280/Blog";
  constructor(private http: HttpClient) { }

  getPost(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }


  createPost(post:Post): Observable<Post>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Post>(this.postUrl, post, {headers}).pipe(
      tap(data => console.log('createPost: ' + JSON.stringify(data))),
      catchError(this.handleError)
      );
  }

  deletePost(id: number): Observable<{}>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.postUrl}/${id}`
    return this.http.delete<Post>(url,{headers})
    .pipe(
      tap(() => console.log('PostDeleted: ' + id)),
      catchError(this.handleError)
      );
  }

  updatePost(post: Post): Observable<Post>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.postUrl}/${post.id}`;
    return this.http.put<Post>(url, {headers})
    .pipe(
      tap(()=> console.log('PostUpdate' + post.id)),
      map(()=> post),
      catchError(this.handleError)
      )
  }


  private handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
