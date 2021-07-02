import { createContext, useState } from "react";


//Criação da Context
export const PaginationContext = createContext()

function PaginationContextProvider(props) {
    
    const [offset, setOffset] = useState(0);

    return (
        <PaginationContext.Provider value={{ offset, setOffset }}>
            {props.children}
        </PaginationContext.Provider>
        )

};


export { PaginationContextProvider };