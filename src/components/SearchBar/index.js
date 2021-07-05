import { useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

function SearchBar({value, onChange}) {


    const [displayValue, setDisplayValue]   = useState(value);
    const debouncedChange = useDebounce(onChange, 500);

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
                        />
                    </div>
                </div>
            </section>

    )
};

export {SearchBar};