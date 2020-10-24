import React, { useEffect } from "react";
import { SignUpComponent } from "Components";
import { useAuth } from "Hooks";
import { navigate, Link } from "gatsby";

interface ISignUpPageProps {}

export default ({}: ISignUpPageProps) => {
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
            <SignUpComponent/>
            <Link to="/">Accueil</Link>
            <Link to="/login">Login</Link>
        </div>
    )
}
