import React from "react";
import { ButtonComponent, FieldComponent, MessageComponent } from "Components";
import { useAuth, useError } from "Hooks";

import SignInStyle from "./sign-in.component.module.sass";

interface ISignInComponentProps {}

export function SignInComponent ({}: ISignInComponentProps) {
    const { login } = useAuth();
    const [error, setError] = useError();

    const handleSubmit = function(event: any) {
        event.preventDefault();
        const data = new FormData(event.target);
        login(data)
            .catch((e: any) => {
                setError(e);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <MessageComponent type="error">{JSON.stringify(error)}</MessageComponent>}
            <FieldComponent name="identifier" error="" className="">Nom ou email</FieldComponent>
            <FieldComponent name="password" type="password" error="" className="">Mot de passe</FieldComponent>
            <FieldComponent name="remember_me" type="checkbox" error="" className="">Se souvenir de moi</FieldComponent>
            <div className={SignInStyle.nav}>
                <ButtonComponent>Se Connecter</ButtonComponent>
                <ButtonComponent type={5} link="/sign-up">S'inscrire</ButtonComponent>
            </div>
        </form>
    );
}