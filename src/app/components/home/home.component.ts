import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import {Post, User} from '../../model';
import {AuthenticationService, UserService} from '../../shared';
import {PostsService} from "../../shared/posts.service";

@Component({ templateUrl: 'home.component.html', styleUrls: ['./home.component.scss'] })
export class HomeComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  usersByFollowees: User[] = [];
  constructor(
    private authenticationService: AuthenticationService, private us: UserService, private ps: PostsService
    ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.us.getById(this.currentUser.id).subscribe(user => {
      this.us.getAll().subscribe(users => {
        for(let user of users){
   
            this.usersByFollowees.push(user);
          }
        
      })
    });
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }

}
