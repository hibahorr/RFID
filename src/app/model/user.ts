export class User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
  profilePicture: string;
  follows: Array<number> = new Array<number>();
  followers: Array<number> = new Array<number>();
}
