import React from "react";
import { SignOutComponent } from "Components";
import { Link } from "gatsby";

import HeaderStyle from "./header.component.module.sass";

export function AppHeaderComponent() {
    console.log(HeaderStyle);
    return (
        <header className={HeaderStyle.header}>
            <div className={`${HeaderStyle.headerContainer} container`}>
                <Link to="/app">Plan</Link>
                <Link to="/app/account">Profil</Link>
                <SignOutComponent />
            </div>
        </header>
    );
}
