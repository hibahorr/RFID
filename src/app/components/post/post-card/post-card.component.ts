import {Component, Input, OnInit} from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import {Post, User} from "../../../model";
import {AlertService, AuthenticationService, UserService} from "../../../shared";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PostsService} from "../../../shared/posts.service";

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  @Input() user: User;
  @Output() removedEventEmitter = new EventEmitter<User>();
  isLikedByCurrentUser: boolean = false;
  postAuthor: User;
  closeResult = '';
  currentUser: number = Number(sessionStorage.getItem('id'));

  constructor(private userService: UserService, private authService: AuthenticationService,private modalService: NgbModal, private alertService: AlertService, private postsService: PostsService) {

  }

  ngOnInit(): void {
 //   console.log(this.currentUser);
    // this.authService.currentUser.subscribe(value => {
      // if(this.post.likedBy.includes(value.id)){
        // this.isLikedByCurrentUser = true;
      // }
    // });
    
  }
  delete(): void{
    this.alertService.success('Succesfully deleted '+ this.user.email, false);
    return this.removedEventEmitter.emit(this.user);
  }

  

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if(result==='delete'){
        this.delete();
      }
    });
  }

}

