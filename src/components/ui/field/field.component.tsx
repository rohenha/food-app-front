import React from "react";

import FieldStyle from "./field.component.module.sass";

interface IFieldComponentProps {
    name: string,
    children: React.ReactNode,
    type?: string,
    error: string,
    className: string
    defaultValue?: string,
    value?: string | number,
    onChange?: any
}

export function FieldComponent ({  name, children, type = "text", error, className, ...props }: IFieldComponentProps) {
    return (
        <div className={`${FieldStyle.fieldGroup} ${className}`}>
            {children && <label className={FieldStyle.fieldLabel} htmlFor={name}>{children}</label>}
            {type === "textarea" ?
                <textarea name={name} id={name} className={`${FieldStyle.fieldInput}${error ? ' is-invalid' : '' }`} {...props}></textarea>
                : <input type={type} name={name} id={name} className={`${FieldStyle.fieldInput}${error ? ' is-invalid' : '' }`} {...props} />
            }
            {error && <div className={FieldStyle.fieldInvalid}>{error}</div>}
        </div>
    );
}