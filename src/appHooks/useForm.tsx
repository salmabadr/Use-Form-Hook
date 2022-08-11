import { useReducer, useEffect } from "react";
import { registerFieldOptions, useFormObject, genericObject } from "../constants";
import { checkValidations } from "../helperFunctions";

export default function useForm(initialState: any = {}): useFormObject {
    const options: any = {}
    let errors: genericObject = {}

    function reducer(reducerState: genericObject, action: genericObject) {
        switch (action.type) {
            case "UpdateValue":
                reducerState[action.payload.name] = action.payload.value;
                return { ...reducerState }
            default:
                return { ...reducerState }
        }
    }

    const [state, dispatch]: any = useReducer(reducer, initialState);

    const reset = () => { }

    const handleOnChange = (e: genericObject) =>
        dispatch({
            type: "UpdateValue", payload: {
                value: e.target.value,
                name: e.target.name,
            }
        })

    useEffect(() => {
        const newErrors = checkValidations(options, state);
        errors = { ...errors, newErrors }
    }, [state])

    const registerField = (name: string, registerFieldOptions?: registerFieldOptions) => {
        let fieldObject: genericObject = {};
        options[name] = registerFieldOptions;
        fieldObject.name = name;
        fieldObject.required = registerFieldOptions?.required || false;
        fieldObject.value = state[name]
        fieldObject.onChange = (e: any) => handleOnChange(e)
        return fieldObject;
    }

    return {
        state, reset, errors, registerField
    }
}