import { createContext, useState } from "react";


//Criação da Context
export const LoadingContext = createContext()

function LoadingContextProvider(props) {
    
    const [loading, setLoading]   = useState(true);

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {props.children}
        </LoadingContext.Provider>
        )

};


export { LoadingContextProvider };