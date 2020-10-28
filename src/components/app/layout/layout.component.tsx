import React, { useEffect } from "react";
import { AppHeaderComponent } from "Components";
import { navigate } from "gatsby";
import { useAuth } from "Hooks";

interface IAppPageProps {
    children: React.ReactNode
}

export function AppLayout({ children }: IAppPageProps) {
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
        <React.Fragment>
            <AppHeaderComponent />
            <main className={`page`}>
                <div className="container">
                    {children}
                </div>
            </main>
        </React.Fragment>
    );
}