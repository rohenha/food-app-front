import React, { useCallback, useState } from "react";
import { ButtonComponent, EmailComponent, FieldComponent, PasswordComponent } from "Components";
import { useAuth } from "Hooks";

interface ISignUpComponentProps {}

export function SignUpComponent ({}: ISignUpComponentProps) {
    const { state, register } = useAuth();
    const [form, setForm] = useState({
        email: "",
        password: "",
        error: false
    });
    const [error, setError] = useState('');

    const handleChangeValue = useCallback((value: string | boolean, attribute: string) => {
        setForm(f => ({ ...f, [attribute]: value }) );
    }, []);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const error = checkFormValidity();
        if (error !== form.error) {
            handleChangeValue(error, 'error');
        }
        if (error) {
            return;
        }
        const data = new FormData(e.target);
        register(data)
            .catch((e: any) => {
                const { response: { data: { message: [{ messages: [error]}] } } } = e;
                const { message: msg } = error;
                setError(msg);
            });
    };

    const checkFormValidity = () => {
        return form.email === "" || form.password === "";
    };

    return (
        <form onSubmit={handleSubmit}>
            <pre>
                { JSON.stringify({ form }, null, 2)}
            </pre>
            {error && <p>{error}</p>}
            <FieldComponent name="username" error="" className="">Username</FieldComponent>
            <EmailComponent error={form.error} verification callback={handleChangeValue} />
            <PasswordComponent error={form.error} verification callback={handleChangeValue} />
            <ButtonComponent>S'inscrire</ButtonComponent>
        </form>
    );
}