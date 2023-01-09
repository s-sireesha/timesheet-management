import { Authcontext}  from "../src/context/AuthContext";
import { createContext } from "react";

export const useAuthContext=()=>{
    const context=useContext(Authcontext);

    if(!context){
        throw Error ("use Authcontext con not be used")
    }

    return context;
}