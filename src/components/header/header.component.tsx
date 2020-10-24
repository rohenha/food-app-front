import React from "react";
import { SignOutComponent } from "Components";
import { Link } from "gatsby";

import "./header.component.sass"

interface IHeaderComponentProps {}

export function HeaderComponent({}: IHeaderComponentProps) {

    return (
        <header className="header">
            <div className="container">
                <p>Header</p>
                <Link to="/app">Plan</Link>
                <Link to="/app/account">Profil</Link>
                <SignOutComponent />
            </div>
        </header>
    );
}
