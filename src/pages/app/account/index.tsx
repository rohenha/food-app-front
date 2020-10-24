import React, { useEffect } from "react";
import { AppLayout } from "Components";
import { useAuth } from "Hooks";
import { Link } from "gatsby";

interface IAppPageProps {}

export default ({}: IAppPageProps) => {
    const { state, getAccount } = useAuth();

    useEffect(() => {
        if (Object.keys(state.user).length === 0) {
            getAccount();
        }
    }, []);

    return (
        <AppLayout>
            <React.Fragment>
                <h1>Account Page</h1>
                <p>This is another protected Account page</p>
                <div className="row">
                    <div className="col-6">
                        <h4>Username</h4>
                        <p>{state.user.username}</p>
                        <h4>Email</h4>
                        <p>{state.user.email}</p>
                    </div>
                    <div className="col-6">
                        <h4>Name</h4>
                        <p>{state.user.name}</p>
                        <h4>Surname</h4>
                        <p>{state.user.surname}</p>
                    </div>
                </div>
                <Link to="/app/account/edit">Editer le profil</Link>
            </React.Fragment>
        </AppLayout>
    );
}