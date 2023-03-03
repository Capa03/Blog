import { getPosts,getCurrentPost } from './stateBlog/blog.reducer';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from './post';
import { PostComponent } from './post/post.component';
import * as PostAction from './stateBlog/blog.action'
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit{
  pageTitle: string = "Blog";

  posts$: Observable<Post[]> | undefined;
  selectedPost$ : Observable<Post| null | undefined> | undefined;

  constructor(private dialogRef: MatDialog, private store: Store<Store>){}

  ngOnInit(): void {
    this.posts$ = this.store.select(getPosts);
    this.store.dispatch(PostAction.loadPosts());
    this.selectedPost$ = this.store.select(getCurrentPost);
  }


  openDialog(){
    let config : MatDialogConfig = {
      hasBackdrop: false,
    }
    this.dialogRef.open(PostComponent,config);
  }

  postSelected(post: Post): void{
    this.store.dispatch(PostAction.setCurrentPost({currentPostId: post.id}));
  }

  onDelete(id: number):void{
    this.store.dispatch(PostAction.deletePost({id: id}));
  }
}
