const MAX_ITEMS = 5; //SEMPRE INFORMAR UM NÚMERO IMPAR
const MAX_LEFT = (MAX_ITEMS - 1) / 2;

function Pagination({limit, total, offset, setOffset}) {

    const current = offset ? (offset / limit) + 1 : 1;
    const pages = Math.ceil(total / limit);
    const first = Math.max(current - MAX_LEFT, 1);
    

    return(
        <ul className="actions fit">
            <li><button type="button">Anterior</button></li>
            
            {
                /*Criação de um Array com base no tamanho */
                Array.from( {length: Math.min(MAX_ITEMS, pages) })
                     .map((_, index) => index + first )
                     .map((page) => (
                            <li key={page}>
                                <button 
                                    type="button"
                                    onClick={ () => setOffset((page-1) * limit) }    
                                >{page}
                                </button>
                            </li>
                        )
                     )  
            
            }
            
            <li><button type="button">Próxima</button></li>
        </ul>
    )
}

export {Pagination};