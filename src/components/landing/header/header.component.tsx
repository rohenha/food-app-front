import React from "react";
import { Link } from "gatsby";
import { ButtonComponent } from "Components";

import style from "./header.component.module.sass";


export function LandingHeaderComponent() {
    return (
        <header className={style.header}>
            <div className="container">
                <div className={style.headerNav}>
                    <Link to="/">Home</Link>
                    <Link to="/contact">Contact</Link>
                </div>
                <ButtonComponent type={5} link="/login">Se connecter</ButtonComponent>
                <ButtonComponent type={5} link="/sign-up">S'inscrire</ButtonComponent>
            </div>
        </header>
    );
}
