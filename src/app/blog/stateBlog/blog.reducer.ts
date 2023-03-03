
import { Post } from './../post';
import * as AppState from '../../globalState/app.state'
import { createFeatureSelector, createSelector, createReducer, INITIAL_STATE, on } from '@ngrx/store';
import * as PostAction from './blog.action'


export interface State extends AppState.State {
  posts: PostState;
}

export interface PostState {
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

const getPostFeatureState = createFeatureSelector<PostState>('post');

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

export const getCurrentPost = createSelector(
  getPostFeatureState,
  getCurrentPostId,
  (state, currentPostId) => {
    if (currentPostId === 0) {
      return {
        id: 0,
        authorName: '',
        title: '',
        content: '',
        unixTime: 0
      }
    } else {
      return currentPostId ? state.posts.find(post => post.id === currentPostId) : null;
    }

  }
)

export const postReducer = createReducer<PostState>(
  initialPostState,
  on(PostAction.toggleEditPost, (state: PostState) => {
    console.log('original State' + JSON.stringify(state));
    return {
      ...state,
      togglePostEdit: !state.togglePostEdit
    };
  }
  ),

  on(PostAction.setCurrentPost, (state, action): PostState => {
    return {
      ...state,
      currentPostId: action.currentPostId
    }
  }),

  on(PostAction.deletePostSuccess, (state, action): PostState => {

    // let posts = [...state.posts];
    // posts.splice(action.id, 1);
    debugger
    const posts = state.posts.filter(post => post.id !== action.id);

    return {
      ...state,
      currentPostId: null, posts: [...posts]
    }
  }),

  on(PostAction.deletePostFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    }

  }),

  // on(PostAction.createPost, (state, action): PostState => {

  //   return {
  //     ...state,
  //     posts: [...state.posts, action.post],
  //   }
  // }),
  on(PostAction.createPostSuccess, (state, action): PostState => {
    debugger
    return {
      ...state,
      posts: [...state.posts, action.post],
    }
  }),
  on(PostAction.loadPostsSuccess, (state, action): PostState => {
    debugger
    return {
      ...state,
      posts: action.posts,
      error: ''
    }
  }),

  on(PostAction.loadPostsFailure, (state, action): PostState => {
    return {
      ...state,
      posts: [],
      error: action.error
    }
  })
)
