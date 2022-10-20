import { useCallback } from "react";
import Spinner from "../components/spinner/Spinner";



export const useHttp = () => {

    const request = async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}, spinner = false) => {
        

            const returnSpinner = () => {
                return <Spinner/>
            }            
            const response = await fetch(url, {method, body, headers});

            const data = await response.json();
            if(spinner && !data) {
                returnSpinner();
            }
            return data;

    };


    return {request, 
        }
}