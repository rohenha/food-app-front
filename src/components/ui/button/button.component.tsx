import { Link } from "gatsby";
import React from "react";

import ButtonStyle from "./button.component.module.sass";

interface IButtonComponentProps {
    children: React.ReactNode,
    className?: string,
    type?: number,
    onClick?: any,
    link?: string,
    disabled?: boolean
}

export function ButtonComponent ({ children, type = 1, className, link= "", onClick, disabled }: IButtonComponentProps) {
    const typeArray = [
        'btnPrimary',
        'btnSecondary',
        'btnTertiary',
        'btnBlack',
        'btnWhite',
    ];

    const renderClassName = () => `${ButtonStyle.btn} ${ButtonStyle[typeArray[type - 1]]}${className ? className : ''}`;

    if (link !== "") {
        return (
            <Link to={link} className={renderClassName()}>{children}</Link>
        );
    } else {
        return (
            <button className={renderClassName()} onClick={onClick} disabled={disabled}>{children}</button>
        );
    }
}