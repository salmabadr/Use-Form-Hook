import { genericObject, IS_REQUIRED_MSG } from "./constants";

const firstLetterUpperCase = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

const isBoolean = (value: any) => Boolean(value) === value;

export function isEmpty(data: any): boolean {
  if (Object.values(data)) {
    return !Object.values(data).some((item: any) => {
      return item?.length;
    });
  }
  return false;
}

export function checkValidations(
  options: genericObject,
  state: genericObject
): genericObject {
  let newErrors: genericObject = {};
  const fields: Array<string> = Object.keys(options);

  fields.forEach((field: string) => {
    newErrors[field] = [];

    if (options[field]?.required && !state[field])
      newErrors[field].push(
        `${firstLetterUpperCase(field)} ${IS_REQUIRED_MSG}`
      );

    if (options[field]?.validate) {
      const validationResult = options[field]?.validate(state[field]);
      if (!isBoolean(validationResult)) newErrors[field].push(validationResult);
    }
  });

  return newErrors;
}
