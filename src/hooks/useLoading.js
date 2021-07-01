import { useContext } from 'react';
import { LoadingContext } from '../contexts/LoadingContext';

import { Loading } from "../components/Loading/index";

export function useLoading () {
    
    //Retorna todos os objetos exportados pelo Context
    const value = useContext(LoadingContext);

    //Retorna os valores do Context + o componente de Loading
    return {...value, Loading};
}