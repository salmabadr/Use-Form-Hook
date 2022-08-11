import { useReducer } from "react";
import { registerFieldOptions, useFormObject, genericObject } from "../constants";

export default function useForm(initialState: any = {}): useFormObject {

    function reducer(reducerState: genericObject, action: genericObject) {
        switch (action.type) {
            default:
                return { ...reducerState }
        }
    }

    const [state, dispatch]: any = useReducer(reducer, initialState);

    const errors: genericObject = {}

    const reset = () => { }

    const registerField = (name: string, registerFieldOptions?: registerFieldOptions) => {
    }

    return {
        state, reset, errors, registerField
    }
}