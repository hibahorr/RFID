export class User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
  date_arrivee: Date;
  date_depart: Date;
  profilePicture: string;
  follows: Array<number> = new Array<number>();
  followers: Array<number> = new Array<number>();
}
