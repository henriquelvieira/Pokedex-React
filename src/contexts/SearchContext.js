import { createContext, useState } from "react";


//Criação da Context
export const SearchContext = createContext()

function SearchContextProvider(props) {
    
    const [search,  setSearch] = useState([]);

    return (
        <SearchContext.Provider value={{ search, setSearch }}>
            {props.children}
        </SearchContext.Provider>
        )

};


export { SearchContextProvider };