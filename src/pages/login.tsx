import React, { useEffect } from "react";
import { LandingLayoutComponent, SignInComponent } from "Components";
import { useAuth } from "Hooks";
import { navigate } from "gatsby";

export default () => {
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
        <LandingLayoutComponent>
            <div className="container">
                <div className="row">
                    <div className="col-sm-8 offset-sm-2 col-md-6 offset-md-3">
                        <h1>Connexion</h1>
                        <SignInComponent />
                    </div>
                </div>
            </div>
        </LandingLayoutComponent>
    )
}
