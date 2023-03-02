import { PostEffects } from './stateBlog/blog.effects';
import { EffectsModule } from '@ngrx/effects';
import { postReducer } from './stateBlog/blog.reducer';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BlogComponent } from './blog.component';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { PostComponent } from './post/post.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BlogComponent,
    PostComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    StoreModule.forFeature('post',postReducer),
    EffectsModule.forFeature([PostEffects])
  ],
  exports:[
    BlogComponent
  ]
})
export class BlogModule { }
