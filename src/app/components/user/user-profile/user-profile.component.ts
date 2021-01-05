import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService, AuthenticationService, UserService} from "../../../shared";
import {Post, User} from "../../../model";
import {PostsService} from "../../../shared/posts.service";
import {valueReferenceToExpression} from "@angular/compiler-cli/src/ngtsc/annotations/src/util";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: User;
  postsByUser: Post[]=[];
  currentUserFollows: boolean = false;
  currentUser: User;
  routeId: number;
  constructor(private alertService: AlertService,private authService: AuthenticationService, private route: ActivatedRoute, private router: Router, private usersService: UserService, private postsService: PostsService) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(value => this.currentUser = value);
    this.routeId = Number(this.route.snapshot.paramMap.get('id'));
    if(this.routeId == this.currentUser.id){
      this.router.navigateByUrl('/users/profile/update/'+this.currentUser.id);
    }
    this.usersService.getById(this.routeId).subscribe(value => {
      this.user = value;
      if(value.followers.includes(this.currentUser.id))
        this.currentUserFollows = true;
      this.postsService.findAll().subscribe(value1 => {
        for (let post of value1){
          if(post.createdBy === this.routeId){
            this.postsByUser.push(post);
          }
        }
      });
    });
  }

  deleteItem($event: Post) {
    this.postsService.delete($event.id).subscribe(value => {
      console.log(value + 'DELETED!');
    });
    this.postsByUser.splice(this.postsByUser.indexOf($event, 0), 1);
  }

  subOrUnsub() {
    if(this.currentUserFollows){
      this.user.followers.splice(this.currentUser.id,1);
      this.currentUser.follows.splice(this.user.id,1);
    } else {
      this.user.followers.push(this.currentUser.id);
      this.currentUser.follows.push(this.user.id);
    }
    this.usersService.putOrPost(this.currentUser).subscribe(value => console.log(value));
    this.usersService.putOrPost(this.user).subscribe(valueReferenceToExpression => {
      this.alertService.success('Succesfully ' + this.currentUserFollows ? 'followed' : 'unfollowed'+ ' user');
    }, error => {
      this.alertService.error('Couldnt follow / unfollow user!', false);
    });
    this.currentUserFollows = !this.currentUserFollows;
  }
}
