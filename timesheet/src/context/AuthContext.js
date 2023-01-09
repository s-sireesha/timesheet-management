import {createContext,useReducer} from "react"
export const Authcontext=createContext();

export const authReducer=(state,action)=>{
    switch(action.type){
        case 'LOGIN':
            return {user:action.payload}

            case 'LOGOUT':
                return {user:null};

    }
};

const AuthcontextProvider=({childrens})=>{
    const [state,dispatch]=useReducer(authReducer,{
        user:null,
    })

    console.log("Authcontext state:",state);

    return(
        <Authcontext.Provider value={{...state,dispatch}}>
            {childrens}
        </Authcontext.Provider>
    )
}