import React from "react";

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
        <div className={`form-group ${className}`}>
            {children && <label htmlFor={name}>{children}</label>}
            {type === "textarea" ?
                <textarea name={name} id={name} className={`form-control${error ? ' is-invalid' : '' }`} {...props}></textarea>
                : <input type={type} name={name} id={name} className={`form-control${error ? ' is-invalid' : '' }`} {...props} />
            }
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
}