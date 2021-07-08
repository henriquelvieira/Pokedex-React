import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { useDebounce } from '../../hooks/useDebounce';

import { capitalizeText } from '../../services/utilities';

import {pokemonsList} from './pokemonsList';

function SearchBar({value, onChange}) {


    const [displayValue, setDisplayValue]   = useState(value);
    const debouncedChange = useDebounce(onChange, 700);

    function handleChange(event) {
        const value = event.target.value;
        setDisplayValue(value);
        debouncedChange(value);
    }

    return (
            <section className="main special">
                <div className="row gtr-uniform">
                    <div className="col-12">
                                                                  
                        
                        <input 
                            type="text" 
                            name="demo-name" 
                            id="demo-name"  
                            placeholder="Pesquisar Pokémon (Nome ou ID)..." 
                            value={displayValue} 
                            onChange={handleChange} 
                            list="browsers"
                        />
                        
                        <datalist id="browsers">
                            {pokemonsList.map(dados => (
                                <option value={capitalizeText(dados.name)} />
                                )
                            
                            )};
 
                        </datalist>
                        
                    </div>
                </div>
            </section>

    )
};

export {SearchBar};