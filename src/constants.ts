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
