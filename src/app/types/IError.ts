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
