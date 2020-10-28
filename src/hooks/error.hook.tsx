import { useState } from "react";

export function useError(): [string | null, (e: any) => void] {
    const [error, setError] = useState(null);

    const handleSetError = (e: any) => {
        if(e.response && e.response.data && e.response.data.message && e.response.data.message.length > 0) {
            const { response: { data: { message: [{ messages: [error]}] } } } = e;
            const { message: msg } = error;
            console.log(msg);
            setError(msg);
        }
    };

    return [
        error,
        handleSetError
    ];
}