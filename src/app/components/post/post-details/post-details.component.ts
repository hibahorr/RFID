import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import {PostsService} from "../../../shared/posts.service";
import {Post, User, Comment} from "../../../model";
import {AlertService, UserService} from "../../../shared";

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  post: Post;
  postAuthor: User;
  loading: boolean = true;
  commentContent: string;
  isLikedByCurrentUser: boolean;
  currentUserId: number = Number(sessionStorage.getItem('id'));
  constructor(private route: ActivatedRoute,
              private location: Location,
              private router: Router,
              private postsService: PostsService,
              private usersService: UserService,
              private alertService: AlertService) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.postsService.findById(id).subscribe(postPromise => {
      this.post = postPromise;
      this.usersService.getById(postPromise.createdBy).subscribe(userPromise => {
        this.postAuthor = userPromise;
        this.loading = false;
        this.isLikedByCurrentUser = postPromise.likedBy.includes(Number(sessionStorage.getItem('id')));
      });
    });

  }

  public deletePost() {
    const id = this.route.snapshot.paramMap.get('id');
    const nId = Number(id);
    this.postsService.delete(nId).subscribe(() => {
      this.router.navigate(["/posts"]).then(r => console.log(r));
      this.alertService.success('Succesfully deleted '+ this.post.title, false);
    });
  }

    doLike(): void {
      if(this.post.likedBy.includes(this.currentUserId)){
        const index = this.post.likedBy.indexOf(this.currentUserId, 0);
        if (index > -1) {
          this.post.likedBy.splice(index, 1);
        }
      } else {
        this.post.likedBy.push(this.currentUserId);
      }
      this.postsService.createOrUpdate(this.post).subscribe(value => this.alertService.success('Succesfully updated'),error => this.alertService.error('Couldnt update'));
      this.isLikedByCurrentUser = !this.isLikedByCurrentUser;
    }
    doComment(): void{
    console.log(this.currentUserId);
      if(this.commentContent == undefined || this.commentContent.length < 6){
        alert('Comment cannot be blank!');
      } else {
        this.post.comments.push(new Comment(this.currentUserId,this.commentContent, new Date()));
        this.postsService.createOrUpdate(this.post).subscribe(value => this.alertService.success('Succesfully posted comment',false),error => this.alertService.error('Couldnt post comment!',false));
        this.commentContent = '';
      }
    }

  alert(): void {
    alert(this.commentContent);
  }

  deleteComment($event: Comment): void {
    let index = this.post.comments.indexOf($event);
    if (index > -1) {
      this.post.comments.splice(index, 1);
    }
    this.postsService.createOrUpdate(this.post).subscribe(value => this.alertService.success('Deleted post'), error => this.alertService.error('Couldnt delete post!'));
  }
}
