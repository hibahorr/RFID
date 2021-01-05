import {Comment} from "./comment";

export class Post{
  id: number;
  title: string;
  body: string;
  pictureLink: string;
  createdBy: number;
  categories: Array<string>;
  comments: Array<Comment>;
  likedBy: Array<number>;

  constructor(id: number, title: string, body: string, pictureLink: string, createdBy: number, categories: Array<string>, comments: Array<Comment>,likedBy?: Array<number>){
    this.id = id;
    this.title = title;
    this.body = body;
    this.pictureLink = pictureLink;
    this.createdBy = createdBy;
    this.categories = new Array<string>();
    this.comments = new Array<Comment>();
    this.likedBy = new Array<number>();
  }
}

