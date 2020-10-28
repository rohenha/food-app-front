import * as React from "react"

import footerStyle from "./footer.component.module.sass";

interface IFooterComponentProps {}

export function LandingFooterComponent({}: IFooterComponentProps) {
    return (
        <React.Fragment>
            <footer className={footerStyle.footer}>
                <div className="container">
                    <p>footer</p>
                </div>
            </footer>
        </React.Fragment>
    )
}
