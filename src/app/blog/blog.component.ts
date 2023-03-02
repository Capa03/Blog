import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostComponent } from './post/post.component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  pageTitle: string = "Blog";

  constructor(private dialogRef: MatDialog){}

  openDialog(){
    this.dialogRef.open(PostComponent);
  }
}
