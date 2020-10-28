import React, { useCallback, useState } from "react";
import { ButtonComponent, EmailComponent, FieldComponent, MessageComponent, PasswordComponent } from "Components";
import { useAuth, useError } from "Hooks";

import SignUpStyle from "./sign-up.component.module.sass";

interface ISignUpComponentProps {}

export function SignUpComponent ({}: ISignUpComponentProps) {
    const { register } = useAuth();
    const [form, setForm] = useState({
        email: "",
        password: "",
        error: false
    });
    const [error, setError] = useError();

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
                setError(e);
            });
    };

    const checkFormValidity = () => {
        return form.email === "" || form.password === "";
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <MessageComponent type="error">{JSON.stringify(error)}</MessageComponent>}
            <div className="row mb-4">
                <div className="col-md-6 mb-4 mb-md-0">
                    <FieldComponent name="username" error="" className="">Username</FieldComponent>
                    <EmailComponent error={form.error} verification callback={handleChangeValue} />
                </div>
                <div className="col-md-6">
                    <PasswordComponent error={form.error} verification callback={handleChangeValue} />
                </div>
            </div>
            <div className={SignUpStyle.nav}>
                <ButtonComponent>S'inscrire</ButtonComponent>
                <ButtonComponent type={5} link="/login">Se connecter</ButtonComponent>
            </div>
        </form>
    );
}