import { catchError, map, mergeMap, of } from 'rxjs';
import { PostService } from './../post/post.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as PostAction from './blog.action'
@Injectable()

export class PostEffects{

  constructor(private actions$: Actions , private postService: PostService){}

  loadPosts$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(PostAction.loadPosts),
      mergeMap(()=> this.postService.getPost().pipe(
        map(posts => PostAction.loadPostsSuccess({posts})),
        catchError(error => of(PostAction.loadPostsFailure({error})))
      ))
    )
  })
}

