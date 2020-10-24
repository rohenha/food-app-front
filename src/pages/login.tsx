import React, { useEffect } from "react";
import { SignInComponent } from "Components";
import { useAuth } from "Hooks";
import { navigate, Link } from "gatsby";

interface ILoginPageProps {}

export default function Login({}: ILoginPageProps) {
    const { state } = useAuth();

    useEffect(() => {
        if (state.loggedIn) {
            navigate('/app');
        }
    }, [state]);

    if (state.loggedIn) {
        return null;
    }

    return (
        <div className="container">
            <SignInComponent />
            <Link to="/">Accueil</Link>
            <Link to="/sign-up">Sign-up</Link>
        </div>
    )
}
