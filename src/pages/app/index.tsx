import React from "react";
import { AppLayout } from "Components";


interface IAppPageProps {}

export default ({}: IAppPageProps) => {
    return (
        <AppLayout>
            <React.Fragment>
                <h1>Dashboard</h1>
                <p>This is a protected Dashboard</p>
            </React.Fragment>
        </AppLayout>
    );
}