import { useEffect, useState } from 'react';

import { Card } from '../../components/Card';
import { Layout } from '../../components/Layout';
import { SearchInput } from '../../components/SearchInput';
import { Pagination } from '../../components/Pagination';
import { useLoading } from '../../hooks/useLoading';
import { usePagination } from '../../hooks/usePagination';

import { api } from '../../services/api';

import './styles.scss';


function Home() {

    const URL_API = 'https://pokeapi.co/api/v2/pokemon';
    const LIMIT = 16;
    const vUrlImagem = 'https://pokeres.bastionbot.org/images/pokemon/';

    const { setLoading } = useLoading();
    const {offset, setOffset} = usePagination();
    
    const [pokemons, setPokemons] = useState([]);
    const [erro, setErro]         = useState(false);
    const [pagination, setPagination]   = useState({next: '', previous: '', total: ''});
    const [search, setSearch] = useState([]);
    

    function LimpaCaracteres(vTexto){
        const retorno = vTexto;
        return retorno.replace(`${URL_API}/`, '').replace('/', '')
    };

    useEffect(() =>  {

        setLoading(true);
        
            
        async function fetchData() {

            const url = `${URL_API}?offset=${offset}&limit=${LIMIT}`;
            await api.get(url)
                     .then(response => {
                                        const vStatusRetorno = JSON.stringify(response.status, null, 2);
                                        
                                        if (vStatusRetorno === '200') {
                                            const respostaAPI= response.data.results ?? {};
                                            const parseResposta = Object.entries(respostaAPI).map( ([key, value]) => {
                                                return {
                                                    name: value.name,
                                                    url: value.url,
                                                    id: LimpaCaracteres(value.url)
                                                }
                                            });

                                            //Alimentar o State com a lista do Pokémons
                                            setPokemons(parseResposta); 
                                            
                                            //Alimentar o State com a URL para a próxima página
                                            setPagination(
                                                            {
                                                                next: response.data.next, 
                                                                previous: response.data.previous,
                                                                total:  response.data.count
                                                            }
                                                        )

                                        };

                                        }
                    )
                     .catch(error => {
                        setErro(false);
                     });
        };

        fetchData();
        
        //Desabilitar o loading (está dentro do componente Layout e é controlado pelo state loading (Context)
        setLoading(false);
        

      },[offset, erro]);


      //Effect responsavel pela pesquisa
      useEffect(() =>  {
         
        if (search){
              console.log(search);
        }

      }, [search]);

    return (
        
        <Layout page_name= "Pokédex">
            
            <section id="first" className="main special">

                <section className="main special">
                    <SearchInput 
                        value = {search}
                        onChange = {(textoPesquisa) => setSearch(textoPesquisa)}    
                    />
                </section>

                <section>
                    <ul className="features">
                        {pokemons.map(dados => 
                            (
                                <Card 
                                    key = {dados.id}
                                    imagem={`${vUrlImagem}${dados.id}.png`}
                                    name = {dados.name}
                                    id = {dados.id}
                                />
                            )
                        )}
                    </ul>
                    
                    <footer >
                        <Pagination 
                            limit={LIMIT}
                            total= {pagination.total}
                            offset={offset}
                            setOffset={setOffset}
                        />
                    </footer>

                </section>

            </section>
        </Layout>

    )

}

export { Home };
