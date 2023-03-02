
import {Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  title = new FormControl('',[Validators.required])
  name = new FormControl('',[Validators.required])
  content = new FormControl('',[Validators.required, Validators.maxLength(100)])

  postForm = new FormGroup({
    title : this.title,
    name : this.name,
    content : this.content
  });

  onSubmit(date:any){

  }
}
