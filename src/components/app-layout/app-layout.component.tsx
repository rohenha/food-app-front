import React, { useEffect } from "react";
import { LayoutComponent } from "Components";
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
        <LayoutComponent>
            <div className="container">
                <pre>
                    { JSON.stringify(state, null, 2) }
                </pre>
                {children}
            </div>
        </LayoutComponent>
    );
}