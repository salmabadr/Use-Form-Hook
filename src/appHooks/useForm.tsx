import { useEffect, useReducer, useState } from "react";
import {
    registerFieldOptions,
    useFormObject,
    genericObject,
    ACTION_TYPES,
} from "../constants";
import { checkValidations } from "../helperFunctions";

export default function useForm(initialState: any = {}): useFormObject {

    const options: any = {}
    let [errors, setErrors] = useState({})

    function reducer(reducerState: genericObject, action: genericObject) {
        switch (action.type) {
            case ACTION_TYPES.UPDATE_VALUE:
                setErrors({ ...errors, [action.payload.name]: undefined })
                reducerState[action.payload.name] = action.payload.value;
                return { ...reducerState }

            case ACTION_TYPES.RESET_VALUES:
                return { ...initialState }

            default:
                return { ...reducerState }
        }
    }

    const [state, dispatch]: any = useReducer(reducer, initialState);


    const reset = () => dispatch({
        type: ACTION_TYPES.RESET_VALUES
    })

    const handleOnChange = (e: genericObject) =>
        dispatch({
            type: ACTION_TYPES.UPDATE_VALUE, payload: {
                value: e.target.value,
                name: e.target.name,
            }
        })

    useEffect(() => {
        const newErrors = checkValidations(options, state);
        setErrors({ ...errors, ...newErrors });
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