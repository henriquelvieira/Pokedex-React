import { useEffect, useState } from 'react';

import { useParams, Link } from 'react-router-dom';

import { Card } from '../../components/Card';
import { Layout } from '../../components/Layout';
import { SearchBar } from '../../components/SearchBar';
import { Pagination } from '../../components/Pagination';

import { useLoading } from '../../hooks/useLoading';
import { usePagination } from '../../hooks/usePagination';
import { useSearch } from '../../hooks/useSearch';

import { api } from '../../services/api';
import { capitalizeText } from '../../services/utilities';

import './styles.scss';


function Home() {

    //Pegar o valor do parametro ID da URL
    const params = useParams()
    const POKEMON_TYPE = params.id;

    const URL_API = 'https://pokeapi.co/api/v2';
    const vUrlImagem = 'https://pokeres.bastionbot.org/images/pokemon/';
    const LIMIT_PAGE = 16;

    const { setLoading } = useLoading();
    const {offset, setOffset} = usePagination();
    const {search, setSearch} = useSearch();

    const [pokemons, setPokemons] = useState([]);
    const [erro, setErro]         = useState(false);
    const [pagination, setPagination]   = useState({next: '', previous: '', total: ''});
    //const [search,  setSearch] = useState([]);
    

    function LimpaCaracteres(vTexto){
        const retorno = vTexto;
        return retorno.replace(`${URL_API}/pokemon/`, '').replace('/', '')
    };

    async function searchPokemon(pokemon) {
        const paramSearch = pokemon.toLowerCase().trim();
        const url = `${URL_API}/pokemon/${paramSearch}`;
        
        await setLoading(true);
        
        if (paramSearch){
            
            await api.get(url)
                    .then(response => {
                                            const vStatusRetorno = JSON.stringify(response.status, null, 2);
                                            
                                            if (vStatusRetorno === '200') {
                                                const respostaAPI= response.data ?? {};

                                                const parseResposta = [{
                                                    name: respostaAPI.name,
                                                    id: respostaAPI.id
                                                }];

                                                if (parseResposta) {
                                                    setPokemons(parseResposta);
                                                }
                                            };

                                        }
                    )
                    .catch(error => {
                        setErro(false);
                    });
            }
        await setLoading(false);
    };


    async function getPokemons() {
        
        setLoading(true);

         let url;  
         let tipo_busca;
        
        if (POKEMON_TYPE) {
            url = `${URL_API}/type/${POKEMON_TYPE}`;
            tipo_busca = 'type';
        } else {
            url = `${URL_API}/pokemon?offset=${offset}&limit=${LIMIT_PAGE}`;  
            tipo_busca = 'all';
        }
        
        await api.get(url)
                 .then(response => {
                                        const vStatusRetorno = JSON.stringify(response.status, null, 2);
                                        
                                        if (vStatusRetorno === '200') {
                                            
                                            if (tipo_busca === 'all') {                                 
                                                const respostaAPI= response.data.results ?? {};
                                                const parseResposta = Object.entries(respostaAPI).map( ([key, value]) => {
                                                    return {
                                                        name: value.name,
                                                        id: LimpaCaracteres(value.url)
                                                    }
                                                });

                                                //Alimentar o State com a lista do Pokémons
                                                setPokemons(parseResposta); 
                                            } else {
                                                const respostaAPI= response.data.pokemon ?? {};
                                                const parseResposta = Object.entries(respostaAPI).map( ([key, value]) => {
                                                    return {
                                                        name: value.pokemon.name,
                                                        id: LimpaCaracteres(value.pokemon.url)
                                                    }
                                                });

                                                //Alimentar o State com a lista do Pokémons
                                                setPokemons(parseResposta); 

                                            }

                                            
                                            //Alimentar o State com a URL para a próxima página
                                            setPagination({total:  response.data.count})
                                        };

                                    }
                )
                 .catch(error => {
                    setErro(false);
                 });
        setLoading(false);

        
    };

    
    
    //Effect responsavel pela pesquisa, carregando e paginação
    useEffect(() =>  {

        if (search.length > 0) {
            searchPokemon(search);
        } else if (search.length === 0){
            console.log('Aqui');
            getPokemons();
        }
        //Desabilitar o loading (está dentro do componente Layout e é controlado pelo state loading (Context)

      }, [search, offset]);

    return (
        
        <Layout page_name= "Pokédex">

            <section id="first" className="main special">


                {POKEMON_TYPE && (
                    
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{capitalizeText(POKEMON_TYPE)}</li>
                        </ol>
                  </nav>

                )}

                <SearchBar 
                    value = {search}
                    onChange = {(textoPesquisa) =>  setSearch(textoPesquisa)}    
                />

                <section className="listagem">
                    <ul className="features">
                        {pokemons.map(dados => (
                                <Card 
                                    key = {dados.id}
                                    imagem={`${vUrlImagem}${dados.id}.png`}
                                    name = {dados.name}
                                    id = {dados.id}
                                />
                            )
                        )}
                    </ul>

                </section>

                {pokemons.length > 1 && (   
                        <Pagination 
                            limit={LIMIT_PAGE}
                            total= {pagination.total}
                            offset={offset}
                            setOffset={setOffset}
                        />
                )}

            </section>
        </Layout>

    )

}

export { Home };
