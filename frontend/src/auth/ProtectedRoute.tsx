import { ReactNode, useContext } from "react";
import { UserContext } from "./UserContext";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }: { children: ReactNode }): ReactNode => {
    const { user, error } = useContext<any>(UserContext); //El contexto ya asegura que ya isLoading este en falso
    if (user === null || error) { return <Navigate to={'/login'} /> }
    return children;
}

export { ProtectedRoute }
