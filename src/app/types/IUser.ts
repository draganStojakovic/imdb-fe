export interface IUser {
  fname: string;
  lname: string;
  email: string;
}

export interface IUserDraft extends IUser {
  password: string;
}

export interface IUserForm {
  email: string;
  password: string;
}
