import { Post } from './../post';
import { State } from './../../globalState/app.state';
import {Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as PostAction from '../stateBlog/blog.action'
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  constructor(private store: Store<State>){}

  title = new FormControl('',[Validators.required])
  name = new FormControl('',[Validators.required])
  content = new FormControl('',[Validators.required, Validators.maxLength(100)])

  postForm = new FormGroup({

    title : this.title,
    authorName : this.name,
    content : this.content
  });


  onSubmit(post:any){

    let addPost: Post = {
      ...post,
      id: 0,
      unixTime: Math.floor(Date.now()/1000)
    }

    this.store.dispatch(PostAction.createPost({post: addPost}))
  }


}

