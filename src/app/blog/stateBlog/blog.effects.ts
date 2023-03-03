import { catchError, exhaustMap, map, mergeMap, of } from 'rxjs';
import { PostService } from './../post/post.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as PostAction from './blog.action'
@Injectable()

export class PostEffects {

  constructor(private actions$: Actions, private postService: PostService) { }

  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostAction.loadPosts),
      mergeMap(() => this.postService.getPost().pipe(
        map(posts => PostAction.loadPostsSuccess({ posts })),
        catchError(error => of(PostAction.loadPostsFailure({ error })))
      ))
    )
  })

  createPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostAction.createPost),
      map(action => action.post),
      mergeMap(post => this.postService.createPost(post).pipe(
        map((post) => PostAction.createPostSuccess({post})),
        catchError(error => of(PostAction.loadPostsFailure({ error }))))
      ))
  })

  deletePost$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(PostAction.deletePost),
      exhaustMap(post=> this.postService.deletePost(post.id).pipe(
        map((p) => {
          debugger
          return PostAction.deletePostSuccess({id: p})}),
        catchError(error=> of(PostAction.deletePostFailure({ error })))
      ))
    )
  })
}


