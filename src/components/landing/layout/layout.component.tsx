import { LandingFooterComponent, LandingHeaderComponent } from "Components"
import React from "react";
import "./layout.component.sass"

interface ILandingLayoutComponentProps {
    children: React.ReactElement<any>
}

export function LandingLayoutComponent({ children }: ILandingLayoutComponentProps) {
    return (
        <React.Fragment>
            <LandingHeaderComponent />
            <main className={`page`}>
                {children}
            </main>
            <LandingFooterComponent />
        </React.Fragment>
    )
}
