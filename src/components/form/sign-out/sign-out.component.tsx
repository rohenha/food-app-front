import React from "react";
import { ButtonComponent } from "Components";
import { useAuth } from "Hooks";

interface IFieldComponentProps {}

export function SignOutComponent ({}: IFieldComponentProps) {
    const { logout } = useAuth();
    const handleSignOut = (e: any) => {
        e.preventDefault();
        logout();
    };

    return (
        <ButtonComponent type={4} onClick={handleSignOut}>Se déconnecter</ButtonComponent>
    );
}