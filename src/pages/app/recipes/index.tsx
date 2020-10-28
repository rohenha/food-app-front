import React from "react";
import { AppLayout } from "Components";

export default () => {
    return (
        <AppLayout>
            <React.Fragment>
                <h1>Recettes</h1>
                <p>This is a protected Dashboard</p>
            </React.Fragment>
        </AppLayout>
    );
}