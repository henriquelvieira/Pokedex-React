import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';


import { useLoading } from '../../hooks/useLoading';

import { api } from '../../services/api';

import { Layout } from '../../components/Layout';
import { capitalizeText } from '../../services/utilities';

import './styles.scss';

export function Detalhes() {
  
  //Pegar o valor do parametro ID da URL
  const params = useParams()
  const pokemonParam = params.id;

  const { setLoading } = useLoading();

  const [detalhes, setDetalhes]   = useState([]);
  const [abilities, setAbilities]   = useState([]);
  const [stats, setStats]   = useState([]);
  const [types, setTypes]   = useState([]);

  //const [erro, setErro]         = useState(false);
  const [url]           = useState(`https://pokeapi.co/api/v2/pokemon/${pokemonParam}`);
  
  const history = useHistory();
  const vUrlImagem = 'https://pokeres.bastionbot.org/images/pokemon/';


  function handleVoltar() {
    //history.push('/');
    history.goBack();
  };


  async function getPokemonData() { 
      
      setLoading(true);
      
      await api.get(url)
               .then(response => {
                                      const vStatusRetorno = JSON.stringify(response.status, null, 2);
                                      const vRespota = response.data;
                                    
                                      if (vStatusRetorno === '200') {
                                          setDetalhes(vRespota);
                                          setAbilities(vRespota.abilities);
                                          setStats(vRespota.stats);
                                          setTypes(vRespota.types)  
                                      };

                                  }
              )
               .catch(error => {
                  //setErro(false);
               });

      setLoading(false);
      
  };

  function handleClick( id) {
    alert(`Param = ${id}`)
  };

  function renderAbilities (data, index){
    return (
      <li key = {data.ability.name}>
        {capitalizeText(data.ability.name)}
        {/*<button onClick={(event) => handleClick(data.ability.name)}>Teste</button>*/}
      </li>
    )
  }

  useEffect(() =>  {
    
    getPokemonData();

  },[url]);


    return (

      <Layout >
        
        <section className="main">

          <header className="alt">
  
            {pokemonParam && (
              <button type='button' className='button primary' onClick={handleVoltar}>Voltar</button>
            )}

            <h1>#{detalhes.id} {capitalizeText(pokemonParam)}</h1>
            
          </header>


          <section>

            <div className="box alt">
              <div className="row gtr-uniform">

                <div className="col-6">
                  <img src={`${vUrlImagem}${detalhes.id}.png`} alt={detalhes.name} className="pokemons" />
                </div>

                <div className="col-6">
                  
                  <ul className="alt">
                    <li>{`Base Experience: ${detalhes.base_experience}`}</li>
                    <li>{`Height: ${detalhes.height}`}</li>
                    <li>{`Weight: ${detalhes.weight}`}</li>
                    
                    <li>Tipo:<br /><br />
                    
                      <ul className="actions small"> 
                        {types.map(data => (
                                <li key= {data.type.name}>
                                  <Link 
                                    to={'/type/'+data.type.name}
                                    className={`button small background-color-${data.type.name}`}
                                  >
                                    {capitalizeText(data.type.name)}
                                  </Link>
                                </li>
                            )
                        )}
                      </ul>

                    </li>

                  </ul>
                </div>

                <div className="col-4">

                  <h3>Habilidades</h3>

                  <ul className="alt">
                    {abilities.map(renderAbilities)}
                    {/*abilities.map(data => (
                                  <li key = {data.ability.name}>{capitalizeText(data.ability.name)}</li>
                              )
                    )*/}

                    
                  </ul>

                </div>


                <div className="col-8">

                  <h3>Estatisticas</h3>

                  <ul className="alt">
                    {stats.map(data => (
                                    <li key={data.stat.name}>{capitalizeText(data.stat.name)} : {data.base_stat}</li>
                                  )
                    )}
                  </ul>

                </div>


              </div>
            </div>
          </section>

          {pokemonParam && <button type='button' className='button primary' onClick={handleVoltar}>Voltar</button>}
        
        </section>

      </Layout>
       
    )
}