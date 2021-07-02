import { useContext } from 'react';
import { PaginationContext } from '../contexts/PaginationContext';


export function usePagination () {
    
    //Retorna todos os objetos exportados pelo Context
    const value = useContext(PaginationContext);

    //Retorna os valores do Context
    return value;
}