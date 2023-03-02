
import { Post } from './../post';
import * as AppState from'../../globalState/app.state'
import { createFeatureSelector, createSelector, createReducer, INITIAL_STATE, on } from '@ngrx/store';
import * as PostAction from './blog.action'

export interface State extends AppState.State{
  posts: PostState;
}

export interface PostState{
  togglePostEdit: boolean,
  currentPostId: number | null;
  posts: Post[];
  error: string;
}

const initialPostState: PostState = {
  togglePostEdit: false,
  currentPostId: null,
  posts: [],
  error: ''
}

const getPostFeatureState = createFeatureSelector<PostState>('blog');

export const getCurrentPostId = createSelector(
  getPostFeatureState,
  state => state.currentPostId
);

export const getPosts = createSelector(
  getPostFeatureState,
  state => state.posts
);

export const getError = createSelector(
  getPostFeatureState,
  state => state.error
);

export const postReducer = createReducer<PostState>(
  initialPostState,
  on( PostAction.toggleEditPost,(state: PostState) =>{
    console.log('original State' + JSON.stringify(state));
    return{
      ...state,
      togglePostEdit: !state.togglePostEdit
    };
  }
  ),

  on(PostAction.setCurrentPost,(state,action):PostState =>{
    return{
      ...state,
      currentPostId: action.currentPostId
    }
  }),

  on(PostAction.createPost,(state): PostState =>{
    return{
      ...state,
      currentPostId:0
    }
  }

  ),

  on(PostAction.deletePost, state =>{
    return{
      ...state,
      currentPostId: null
    }
  }),

  on(PostAction.loadPostsSuccess,(state,action): PostState =>{
    return{
      ...state,
      posts: action.posts,
      error: ''
    }
  }),

  on(PostAction.loadPostsFailure,(state, action): PostState =>{
    return{
      ...state,
      posts: [],
      error: action.error
    }
  })
)
