import React, { useCallback } from "react";
import { VerificationFieldComponent } from "Components";

interface IPasswordComponentProps {
    verification?: boolean,
    error?: boolean,
    callback: (_value: string, _attribute: string) => void
}

export function PasswordComponent({ error, verification, callback }: IPasswordComponentProps) {
    const checkPasswordValidity = useCallback((password: string) => {
        const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return re.test(String(password).toLowerCase());
    }, []);

    return (
        <VerificationFieldComponent
            verification={verification}
            error={error}
            errorsValues={{ value: "Le mot de passe n'est pas valide", same: "Les mots de passe ne sont pas identiques"}}
            label="Mot de passe"
            type="password"
            checkValidity={checkPasswordValidity}
            callback={callback}
        />
    );
}