import React, { useEffect } from "react";
import { Router } from "@reach/router"
import { LayoutComponent } from "Components";
import { navigate } from "gatsby";
import { useAuth } from "Hooks";
import { Dashboard, Account, AccountEdit } from "App";

interface IAppPageProps {}

export default function App({}: IAppPageProps) {
    const { state } = useAuth();
    useEffect(() => {
        if (!state.loggedIn) {
            navigate('/login');
        }
    }, [state]);

    if (!state.loggedIn) {
        return null;
    }

    return (
        <LayoutComponent>
            <div className="container">
                <pre>
                    { JSON.stringify(state, null, 2) }
                </pre>
                <Router basepath="/app">
                    <Account path="/account" />
                    <AccountEdit path="/account/edit" />
                    <Dashboard default />
                </Router>
            </div>
        </LayoutComponent>
    );
}