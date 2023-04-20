export interface IErrors {
  msg: string;
  location: string;
  value: string;
  param: string;
}

export interface IError {
  success: boolean;
  errors: IErrors[];
}
