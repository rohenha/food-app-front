import React from "react";

interface IButtonComponentProps {
    children: React.ReactNode,
    className?: string,
    type?: string,
    onClick?: any,
    disabled?: boolean
}

export function ButtonComponent ({ children, type = "primary", className, onClick, disabled }: IButtonComponentProps) {
    return (
        <button className={`btn btn-${type}${className ? className : ''}`} onClick={onClick} disabled={disabled}>{children}</button>
    );
}