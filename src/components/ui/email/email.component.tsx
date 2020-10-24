import React, { useCallback } from "react";
import { VerificationFieldComponent } from "Components";

interface IEmailComponentProps {
    verification?: boolean,
    error?: boolean,
    callback: (_value: string, _attribute: string) => void
}

export function EmailComponent({ error, verification, callback }: IEmailComponentProps) {
    const checkEmailValidity = useCallback((email: string) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }, []);

    return (
        <VerificationFieldComponent
            verification={verification}
            error={error}
            errorsValues={{ value: "L'email n'est pas valide", same: "Les emails ne sont pas identiques"}}
            label="email"
            type="email"
            checkValidity={checkEmailValidity}
            callback={callback}
        />
    );
}