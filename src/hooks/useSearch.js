import { useContext } from 'react';
import { SearchContext } from '../contexts/SearchContext';


export function useSearch () {
    
    //Retorna todos os objetos exportados pelo Context
    const value = useContext(SearchContext);

    //Retorna os valores do Context
    return value;
}