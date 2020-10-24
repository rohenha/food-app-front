import React, { useState, useEffect, useCallback } from "react";
import { FieldComponent } from "Components";

interface IVerificationFieldComponentProps {
    verification?: boolean,
    defaultValue?: string,
    errorsValues: { value: string, same: string },
    error?: boolean,
    label: string,
    type: string,
    checkValidity: (_value: string) => boolean,
    callback: (_value: string, _attribute: string) => void
}

export function VerificationFieldComponent({ verification = false, label = "", type = "text", errorsValues = { value: "la valeur n'est pas valide", same: "les deux valeurs ne sont pas identiques"}, defaultValue = "", error = false, callback, checkValidity }: IVerificationFieldComponentProps) {

    const [values, setValues] = useState({
        base: defaultValue,
        confirm: defaultValue
    });

    useEffect(() => {
        const equals = values.base === values.confirm;
        const validity = checkValidity(values.base);
        let email = "";
        if (validity && ((equals && verification) || !verification) ) {
            email = values.base;
        };
        callback(email, type);
     }, [values]);

    const handleChangeValue = useCallback((value: string, attribute: string) => {
        setValues(v => ({ ...v, [attribute]: value }));
    }, []);

    const handleChangeBase = useCallback((e: any) => {
        handleChangeValue(e.target.value, 'base');
    }, []);

    const handleChangeConfirm = useCallback((e: any) => {
        handleChangeValue(e.target.value, 'confirm');
    }, []);

    const getError = () => {
        if (!checkValidity(values.base)) {
            return errorsValues.value;
        }
        if (values.base !== values.confirm && verification) {
            return errorsValues.same;
        }
        return;
    };

    return (
        <React.Fragment>
            {error && <p>{getError()}</p>}
            <FieldComponent name={type} type={type} error="" className="" value={values.base} onChange={handleChangeBase}>{label}</FieldComponent>
            {verification && <FieldComponent name={`confirm_${type}`} type={type} error="" className="" value={values.confirm} onChange={handleChangeConfirm}>Confirmation {label}</FieldComponent> }
        </React.Fragment>
    )
}
