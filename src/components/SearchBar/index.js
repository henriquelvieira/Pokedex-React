function SearchBar({value, onChange}) {

    function handleChange(event) {
        onChange(event.target.value);
    }

    return (

            <div className="row gtr-uniform">
                <div className="col-12">
                    <input 
                        type="text" 
                        name="demo-name" 
                        id="demo-name"  
                        placeholder="Pesquisar..." 
                        value={value} 
                        onChange={handleChange} 
                    />
                </div>
            </div>

    )
};

export {SearchBar};