import { Component, OnInit } from '@angular/core';
import {Post} from "../../../model";
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../../shared";
import {PostsService} from "../../../shared/posts.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  post: Post ;
  editForm = this.fb.group({
    title: ['', [Validators.required,Validators.minLength(10), Validators.maxLength(60)]],
    body: ['', [Validators.required,Validators.minLength(10), Validators.maxLength(255)]],
    categories: this.fb.array([
      this.fb.control('',Validators.required)
    ])
  });
  initializeForm(post: Post) {
    this.editForm.setValue({
      title: post.title,
      body: post.body,
      categories: post.categories
    })
  }
  get categories() {
    return this.editForm.get('categories') as FormArray;
  }
  addCategory(): void {
    this.categories.push(this.fb.control(''));
  }
  removeCategory(i: number): void {
    this.categories.removeAt(i);
  }
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private postsService: PostsService, private router: Router, private alertService: AlertService) {

  }
  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.postsService.findById(id).subscribe(postPromise => {
      this.post = postPromise;
      this.initializeForm(postPromise);
    });
  }
  onSubmit() {
    this.post.title = this.editForm.value.title;
    this.post.body = this.editForm.value.body;
    this.post.categories = this.editForm.value.categories;
    this.postsService.createOrUpdate(this.post).subscribe(value => {
      this.router.navigate(["/posts"]).then(r => {
        this.alertService.success('Succesfully updated new post', false)
      });
    },error => this.alertService.error(error,false));
  }


}




