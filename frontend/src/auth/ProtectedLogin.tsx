import { ReactNode, useContext } from "react";
import { UserContext } from "./UserContext";
import { Navigate } from "react-router";

const ProtectedLogin = ({ children }: { children: ReactNode }) => {
    const { user } = useContext<any>(UserContext); //El contexto ya asegura que ya isLoading este en falso
    if (user !== null) { return <Navigate to={'/sucursal/get'} /> }
    return children;
}

export { ProtectedLogin }