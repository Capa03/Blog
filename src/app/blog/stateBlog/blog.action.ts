import { Post } from './../post';
import { createAction, props } from "@ngrx/store";

export const toggleEditPost = createAction('[Post] toggle Post Edit');
export const setCurrentPost = createAction('[Post] Set Current Post',props<{currentPostId: number}>());
export const createPost = createAction('[Post] Create Post');
export const deletePost = createAction('[Post] Delete Post');
// Effects

export const loadPosts = createAction('[Post API] load Posts');
export const loadPostsSuccess = createAction('[Post API] load Posts Success', props<{posts: Post[]}>());
export const loadPostsFailure = createAction('[Post API] load Posts Failure', props<{error: string}>());