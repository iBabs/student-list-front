import {useContext} from 'react';
import { AuthContext } from '../context/AuthContext';



export const useLogOut = () => {
    const {dispatch} = useContext(AuthContext);


    const logOut = () => {
        dispatch({ type: "LOGOUT" });
    };
    return logOut;
}