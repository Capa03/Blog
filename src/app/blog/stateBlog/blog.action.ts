import { Post } from './../post';
import { createAction, props } from "@ngrx/store";

export const toggleEditPost = createAction('[Post Page] toggle Post Edit');
export const setCurrentPost = createAction('[Post Page] Select Current Post',props<{currentPostId: number}>());
export const createPost = createAction('[Post Page] Create Post',props<{post:Post}>());
export const createPostSuccess = createAction('[Post API] Create Post Success',props<{post:Post}>());
export const createPostFailure = createAction('[Post API] Create Post Failure',props<{error: string}>());
export const deletePost = createAction('[Post Page] Delete Post Action',props<{id:number}>());

// Effects

export const loadPosts = createAction('[Post Page] load Posts');
export const loadPostsSuccess = createAction('[Post API] load Posts Success', props<{posts: Post[]}>());
export const loadPostsFailure = createAction('[Post API] load Posts Failure', props<{error: string}>());

export const deletePostSuccess = createAction('[Post API] Delete Post Success',props<{id:number}>());
export const deletePostFailure = createAction('[Post API] Delete Post Failure',props<{error:string}>());