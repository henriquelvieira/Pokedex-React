import { useEffect, useState } from 'react';
import { Card } from '../../components/Card';
import { Layout } from '../../components/Layout';

import { useLoading } from '../../hooks/useLoading';

import { api } from '../../services/api';

import './styles.scss';


export function Home() {

    const { setLoading } = useLoading();
    
    const [pokemons, setPokemons] = useState([]);
    const [erro, setErro]         = useState(false);
    const [url, setURL]           = useState('https://pokeapi.co/api/v2/pokemon?offset=0&limit=12');
    const [pagination, setPagination]   = useState({next: '', previous: ''});
    
    const vUrlImagem = 'https://pokeres.bastionbot.org/images/pokemon/';

    function handlePagination(urlPagination) {
        setURL(urlPagination);
    };

    function LimpaCaracteres(vTexto){
        const retorno = vTexto;
        return retorno.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '')
    };

    useEffect(() =>  {
            
        async function fetchData() {
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
                                                                previous: response.data.previous
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
        

      },[url, erro])

    return (
        
        <Layout page_name= "Pokédex">
            
            <section id="first" className="main special">

                <section className="main special">
                    <form method="post" action="#">
                        <div class="row gtr-uniform">
                            <div className="col-12">
                                <input type="text" name="demo-name" id="demo-name"  placeholder="Name" />
                            </div>
                        </div>
                    </form>
                </section>


                <ul className="features">
                    {pokemons.map(dados => 
                        (
                            <Card 
                                key = {dados.id}
                                imagem={`${vUrlImagem}${dados.id}.png`}
                                name = {dados.name}
                            />
                        )
                    )}
                </ul>
                

                <footer className="major">
                    {pagination.previous && <button type='button' onClick={() => handlePagination(pagination.previous) }>Anterior</button>}
                    {pagination.next && <button type='button' onClick={() => handlePagination(pagination.next) }>Próxima</button>}
                </footer>

            </section>
        </Layout>

    )

}
