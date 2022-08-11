import React from 'react';
import './FormUsingPage.css';
import useForm from '../appHooks/useForm';

export default function FormUsingPage() {
    const { state, reset, errors, registerField } = useForm({ email: '', name: '' })

    return (
        <div>
            <h1>Form Using Page</h1>
            <input
                type="text" {...registerField('name')} />
            <input
                type="email"
                {...registerField('email', {
                    validate: (value: string) => {
                        if (!value) {
                            return 'Email is required'
                        }
                        return true
                    },
                    required: true,
                })}
            />
            <button>Reset</button>
            <button>Submit</button>
        </div>
    )
}