import React, { useCallback, useEffect, useState } from "react";
import { AppLayout, ButtonComponent, EmailComponent, FieldComponent } from "Components";
import { useAuth } from "Hooks";

export default () => {
    const { state, getAccount, update } = useAuth();
    const [form, setForm] = useState({
        email: state.user.email,
        error: false
    });
    const [error, setError] = useState('');


    useEffect(() => {
        if (Object.keys(state.user).length === 0) {
            getAccount();
        }
    }, [state]);

    const handleChangeValue = useCallback((value: string | boolean, attribute: string) => {
        setForm(f => ({ ...f, [attribute]: value }) );
    }, []);

    const handleSubmit = useCallback((e: any) => {
        e.preventDefault();
        const error = checkFormValidity();
        if (error !== form.error) {
            handleChangeValue(error, 'error');
        }
        if (error) {
            return;
        }
        const data = new FormData(e.target);
        update(data)
            .catch((e: any) => {
                if(e.response && e.response.message && e.response.message > 0) {
                    const { response: { data: { message: [{ messages: [error]}] } } } = e;
                    const { message: msg } = error;
                    setError(msg);
                }
            });
    }, []);

    if (state.loading) {
        return null;
    }

    const checkFormValidity = () => {
        return form.email === "";
    };

    return (
        <AppLayout>
            <React.Fragment>
                <h1>Edit Account Page</h1>
                <p>This is another protected Account edit page</p>
                {error && <p>{JSON.stringify(error)}</p>}
                <form className="row" onSubmit={handleSubmit}>
                    <div className="col-6">
                        <h4>Email</h4>
                        <EmailComponent defaultValue={state.user.email} error={form.error} callback={handleChangeValue} />
                    </div>
                    <div className="col-6">
                        <h4>Name</h4>
                        <FieldComponent name="name" defaultValue={state.user.name} error="" className="">Name</FieldComponent>
                        <h4>Surname</h4>
                        <FieldComponent name="surname" defaultValue={state.user.surname} error="" className="">Surname</FieldComponent>
                    </div>
                    <ButtonComponent>Mettre à jour</ButtonComponent>
                </form>
            </React.Fragment>
        </AppLayout>
    );
}