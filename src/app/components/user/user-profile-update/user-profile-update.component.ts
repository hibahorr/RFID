import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Post, User} from "../../../model";
import {UserService} from "../../../shared";
import {PostsService} from "../../../shared/posts.service";

@Component({
  selector: 'app-user-profile-update',
  templateUrl: './user-profile-update.component.html',
  styleUrls: ['./user-profile-update.component.scss']
})
export class UserProfileUpdateComponent implements OnInit {

  user: User;
  postsByUser: Post[]=[];
  currentUserFollows: boolean = false;
  currentUserId: number;
  constructor(private route: ActivatedRoute, private router: Router, private usersService: UserService, private postsService: PostsService) { }

  ngOnInit() {
    this.currentUserId = Number(this.route.snapshot.paramMap.get('id'));
    if(this.currentUserId == Number(sessionStorage.getItem('id'))){
      this.router.navigateByUrl('/users/profile/update/'+this.currentUserId);
    }
    this.usersService.getById(this.currentUserId).subscribe(value => {
      this.user = value;
      if(value.followers.includes(this.currentUserId))
        this.currentUserFollows = true;
      this.postsService.findAll().subscribe(value1 => {
        for (let post of value1){
          if(post.createdBy === this.currentUserId){
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

}
