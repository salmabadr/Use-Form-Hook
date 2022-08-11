import React, { useState } from 'react';
import './FormUsingPage.css';
import useForm from '../appHooks/useForm';
import { isEmpty } from "../helperFunctions";
import {
    EMAIL_REGEX,
    INVALID_EMAIL_MSG,
    SUCCESSFULL_SUBMISSION,
} from "../constants";

export default function FormUsingPage() {
    const { state, reset, errors, registerField } = useForm({ email: '', name: '' })

    const [showErrors, setShowErrors] = useState(false)

    const handleSubmit = () => {
        setShowErrors(true);
        if (isEmpty(errors)) alert(SUCCESSFULL_SUBMISSION) // can access state here
    }

    const handleReset = () => {
        setShowErrors(false);
        reset();
    }

    return (
        <div className="container">
            <h1>Form Using Page</h1>

            <fieldset>
                <label htmlFor="name">Name</label>
                <input
                    type="text" {...registerField('name', { required: true })} />
                {showErrors &&
                    <>
                        {errors.name ?
                            errors.name.map((
                                errorMsg: string, index: number
                            ) => <article
                                key={`name-err-${index}`}
                                className="error-msg">
                                    {errorMsg}
                                </article>
                            )
                            : <></>}
                    </>
                }
            </fieldset>

            <fieldset>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    {...registerField('email', {
                        validate: (value: string) => {
                            if (!EMAIL_REGEX.test(value)) {
                                return INVALID_EMAIL_MSG;
                            }
                            return true
                        },
                        required: true,
                    })}
                />
                {showErrors &&
                    <>
                        {errors.email ?
                            errors.email.map((
                                errorMsg: string, index: number
                            ) => <article
                                key={`email-err-${index}`}
                                className="error-msg">
                                    {errorMsg}
                                </article>
                            )
                            : <></>}
                    </>
                }
            </fieldset>

            <fieldset className="form-buttons">
                <button className="reset-button" onClick={handleReset}>Reset</button>
                <button className="submit-button" onClick={handleSubmit}>Submit</button>
            </fieldset>
        </div>
    )
}