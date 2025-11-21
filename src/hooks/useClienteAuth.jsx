import { useContext } from "react";
import ClienteAuthContext from "../context/ClienteAuthProvider";

const useClienteAuth = () => {
    return useContext(ClienteAuthContext);
}

export default useClienteAuth;
