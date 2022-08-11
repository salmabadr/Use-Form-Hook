import { genericObject } from "./constants";

const firstLetterUpperCase = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export function checkValidations(
  options: genericObject,
  state: genericObject
): genericObject {
  let newErrors: genericObject = {};
  const fields: Array<string> = Object.keys(options);

  fields.forEach((field: string) => {
    newErrors[field] = [];

    if (options[field]?.required && !state[field])
      newErrors[field].push(`${firstLetterUpperCase(field)} is required`);

    if (options[field]?.validate) {
      const returnVal = options[field]?.validate(state[field]);
      if (typeof returnVal !== "boolean") newErrors[field].push(returnVal);
    }
  });

  return newErrors;
}
