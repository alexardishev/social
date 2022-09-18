import { useCallback } from "react";

export const useHttp = () => {

    const request = async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {

            const response = await fetch(url, {method, body, headers});

            const data = await response.json();

            return data;

    };


    return {request, 
        }
}