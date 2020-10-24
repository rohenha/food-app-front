import React, { useState } from "react";
import { ButtonComponent, FieldComponent } from "Components";
import { useAuth } from "Hooks";

interface ISignInComponentProps {}

export function SignInComponent ({}: ISignInComponentProps) {
    const { state, login } = useAuth();
    const [error, setError] = useState('');

    const handleSubmit = function(event: any) {
        event.preventDefault();
        const data = new FormData(event.target);
        login(data)
            .catch((e: any) => {
                if(e.response && e.response.message && e.response.message > 0) {
                    const { response: { data: { message: [{ messages: [error]}] } } } = e;
                    const { message: msg } = error;
                    setError(msg);
                }
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <pre>
                { JSON.stringify({ state }, null, 2)}
            </pre>
            {error && <p>{JSON.stringify(error)}</p>}
            <FieldComponent name="identifier" error="" className="">Nom ou email</FieldComponent>
            <FieldComponent name="password" type="password" error="" className="">Mot de passe</FieldComponent>
            <FieldComponent name="remember_me" type="checkbox" error="" className="">Se souvenir de moi</FieldComponent>
            <ButtonComponent>Se Connecter</ButtonComponent>
        </form>
    );
}