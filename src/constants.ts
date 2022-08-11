export interface genericObject {
  [key: string]: any;
}

export type useFormObject = {
  state: any;
  errors: genericObject;
  reset: Function;
  registerField: Function;
};

export type registerFieldOptions = {
  required?: boolean;
  validate?: Function;
};

export const EMAIL_REGEX = /\S+@\S+\.\S+/;
export const IS_REQUIRED_MSG = " is required";
export const INVALID_EMAIL_MSG = "Email is invalid";
export const SUCCESSFULL_SUBMISSION = "Form Submitted Successfully!";

export const ACTION_TYPES = {
  UPDATE_VALUE: "UPDATE_VALUE",
  RESET_VALUES: "RESET_VALUES",
};
