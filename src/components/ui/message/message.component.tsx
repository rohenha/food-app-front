import React from "react";

import MessageStyle from "./message.component.module.sass";

interface IMessageComponentProps {
    children: React.ReactNode,
    type?: string
}

export function MessageComponent ({ children, type= "valid" }: IMessageComponentProps) {
    const className = "message" + type[0].toUpperCase() + type.substring(1, type.length);
    return (
        <div className={`${MessageStyle.message} ${MessageStyle[className]}`}>
            <p>{children}</p>
        </div>
    );
}