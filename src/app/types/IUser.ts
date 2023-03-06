export interface IUser {
  fname: string;
  lname: string;
  email: string;
}

export interface IUserDraft extends IUser {
  password: string;
}

export interface ISignIn {
  email: string;
  password: string;
}

export interface IRegister extends IUser {
  password: string;
  confirmPassword: string;
}

export interface IError {
  success: boolean;
  errors: [
    {
      msg: string;
      location: string;
      value: string;
      param: string;
    }
  ];
}
