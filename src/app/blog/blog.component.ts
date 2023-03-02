import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from './post';
import { PostComponent } from './post/post.component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  pageTitle: string = "Blog";


  post$: Observable<Post[]> | undefined;
  constructor(private dialogRef: MatDialog, private store: Store<Store>){}



  openDialog(){
    let config : MatDialogConfig = {
      hasBackdrop: false,
    }
    this.dialogRef.open(PostComponent,config);
  }
}
