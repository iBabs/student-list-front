import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const authReducer = (state, action) => {
        switch (action.type) {
            case "LOGIN":
                localStorage.setItem("user", JSON.stringify(action.payload));
                return {
                    ...state,
                    user: action.payload,
                    isAuthenticated: true,
                };
            case "LOGOUT":
                localStorage.clear();
                return {
                    ...state,
                    user: null,
                    isAuthenticated: false,
                };
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(authReducer, {user:null, isAuthenticated: false});

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            dispatch({
                type: "LOGIN",
                payload: JSON.parse(user),
            });
        }
        console.log(user)
    }, []);

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
        {children}
        </AuthContext.Provider>
    );
};
