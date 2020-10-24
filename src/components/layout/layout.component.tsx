import { FooterComponent, HeaderComponent } from "Components"
import React from "react";
import "./layout.component.sass"

interface ILayoutComponentProps {
    children: React.ReactElement<any>
}

export function LayoutComponent({ children }: ILayoutComponentProps) {
    return (
        <React.Fragment>
            <HeaderComponent />
            <main className={`page`}>{children}</main>
            <FooterComponent />
        </React.Fragment>
    )
}
