import React, { createContext, useContext, useReducer, useCallback } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
const apiURL = process.env.BACKEND_URL;

const DEFAULT_STATE = {
    jwt: '',
    user: {},
    loggedIn: false,
    loading: false
};

const reducer = (state: {}, action: any) => {
    switch(action.type){
        case 'LOADING':
            return { ...state, loading: true };
        case 'LOGIN': 
            const { jwt = null, user = {} } = action.payload;
            if (action.remember_me) {
                Cookies.set('token', jwt, { expires: 30 });
                Cookies.set('user', JSON.stringify(user), { expires: 30 });
            }
            sessionStorage.setItem('token', jwt);
            sessionStorage.setItem('user', JSON.stringify(user));
            return { ...state, jwt, user, loggedIn: true, loading: false };
        case 'LOGOUT':
            Cookies.remove("token");
            Cookies.remove("user");
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            return { ...state, jwt: null, user: {}, loggedIn: false, loading: false };
        case 'ACCOUNT':
            const cookieUser = Cookies.get('token');
            if (cookieUser) {
                Cookies.set('user', JSON.stringify(action.payload), { expires: 30 });
            }
            sessionStorage.setItem('user', JSON.stringify(action.payload));
            return { ...state, user: action.payload, loading: false };
        case 'ERROR':
            return { ...state, loading: false };
        default:
            return DEFAULT_STATE;
    }
};

const AuthContext = createContext({} as any);

const AuthProvider = ({ children }: any) => {
    const token = sessionStorage.getItem('token') || Cookies.get('token');
    let userString = sessionStorage.getItem('user') || Cookies.get('user');
    let state = DEFAULT_STATE;
    if (userString) {
        state.user = JSON.parse(userString);
    }
    const date = new Date();
    if (token) {
        const decoded: { id: number, exp: number, iat: number } = jwt_decode(token);
        if (date.getTime() / 1000 > decoded.exp) {
            Cookies.remove("token");
            Cookies.remove("user");
        } else {
            state.jwt = token;
            state.loggedIn = true;
        }
    }
    return(
        <AuthContext.Provider value={useReducer(reducer, state)}>
            {children}
        </AuthContext.Provider>
    );
};

export const wrapRootElement = ({ element }: any) => (
    <AuthProvider>
        {element}
    </AuthProvider>
);

export function useAuth() {
    const [state, dispatcher] = useContext(AuthContext);

    const login = useCallback(async (credentials: FormData) => new Promise(async(resolve, reject) => {
        const remember_me = Boolean(credentials.get('remember_me'));
        dispatcher({ type: 'LOADING'});
        try{
            const { data: payload } = await axios({
                url: `${apiURL}auth/local`,
                method: 'post',
                data: credentials
            });
            dispatcher({ type: 'LOGIN', payload, remember_me });
            resolve(payload);
        }
        catch(e){
            dispatcher({ type: 'ERROR'});
            reject(e);
        }
    }), []);

    const logout = useCallback(() => {
        dispatcher({ type: 'LOGOUT' });
    }, []);

    const register = useCallback(async (credentials: FormData) => new Promise(async(resolve, reject) => {
        dispatcher({ type: 'LOADING'});
        try{
            const { data: payload } = await axios({
                url: `${apiURL}auth/local/register`,
                method: 'post',
                data: credentials
            });
            dispatcher({ type: 'LOGIN', payload });
            resolve(payload);
        }
        catch(e){
            dispatcher({ type: 'ERROR'});
            reject(e);
        }
    }), []);

    const getAccount = useCallback(async () => new Promise(async(resolve, reject) => {
        dispatcher({ type: 'LOADING' });
        try{
            const { data: payload } = await axios({
                method: 'get',
                url: `${apiURL}users/me`,
                headers: {"Authorization" : `Bearer ${state.jwt}`}
            });
            dispatcher({ type: 'ACCOUNT', payload });
            resolve(payload);
        }
        catch(e){
            dispatcher({ type: 'ERROR'});
            reject(e);
        }
    }), [state]);

    const update = useCallback(async (credentials: any) => new Promise(async(resolve, reject) => {
        dispatcher({ type: 'LOADING'});
        try{
            const { data: payload } = await axios({
                method: 'put',
                url: `${apiURL}users/${state.user.id}`,
                headers: {"Authorization" : `Bearer ${state.jwt}`},
                data: credentials
            });
            dispatcher({ type: 'ACCOUNT', payload });
            resolve(payload);
        }
        catch(e){
            dispatcher({ type: 'ERROR'});
            reject(e);
        }
    }), [state]);

    return {
        state,
        login,
        logout,
        register,
        getAccount,
        update
    };
}

