import React, { useState } from 'react';
import './FormUsingPage.css';
import useForm from '../appHooks/useForm';
import { EMAIL_REGEX } from "../constants";

export default function FormUsingPage() {
    const { state, reset, errors, registerField } = useForm({ email: '', name: '' })

    const [showErrors, setShowErrors] = useState(false)

    const handleSubmit = () => {
        setShowErrors(true);
    }

    return (
        <div>
            <h1>Form Using Page</h1>

            <fieldset>
                <label htmlFor="name">Name</label>
                <input
                    type="text" {...registerField('name', { required: true })} />
                {showErrors &&
                    <>{errors.name ? errors.name.map((errorMsg: string) => <article>{errorMsg}</article>) : <></>}</>
                }
            </fieldset>

            <fieldset>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    {...registerField('email', {
                        validate: (value: string) => {
                            if (!EMAIL_REGEX.test(value)) {
                                return 'Invalid Email'
                            }
                            return true
                        },
                        required: true,
                    })}
                />
                {showErrors &&
                    <>{errors.email ? errors.email.map((errorMsg: string) => <article>{errorMsg}</article>) : <></>}</>
                }
            </fieldset>

            <fieldset>
                <button onClick={() => reset()}>Reset</button>
                <button onClick={handleSubmit}>Submit</button>
            </fieldset>
        </div>
    )
}