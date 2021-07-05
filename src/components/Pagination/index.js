import './styles.scss';


const MAX_ITEMS = 5; //SEMPRE INFORMAR UM NÚMERO IMPAR
const MAX_LEFT = (MAX_ITEMS - 1) / 2;


function Pagination({limit, total, offset, setOffset}) {

    const current = offset ? (offset / limit) + 1 : 1;
    const pages = Math.ceil(total / limit);
    const first = Math.max(current - MAX_LEFT, 1);
    
    function onPageChange(page) {
        setOffset((page-1) * limit)    
    }


    return(
        <section>
            <ul className="actions fit custom">
                <li> 
                    <button 
                        type="button"
                        onClick={ () => onPageChange(current-1) } 
                        disabled={current === 1}
                    >Anterior</button>
                </li>
                
                {
                    /*Criação de um Array com base no tamanho */
                    Array.from( {length: Math.min(MAX_ITEMS, pages) })
                        .map((_, index) => index + first )
                        .map((page) => (
                                <li key={page} >
                                    <button 
                                        type="button"
                                        onClick={() => onPageChange(page) } 
                                        className={page === current ? 'primary' : null }  
                                    >{page}
                                    </button>
                                </li>
                            )
                        )  
                
                }
                
                <li>
                    <button 
                        type="button"
                        onClick={ () => onPageChange(current+1) } 
                        disabled={current === pages} //Desabilitar caso a página atual seja igual à ultima página (pages contém o número total de páginas)
                    >Próximo</button>
                </li>
            </ul>
        </section>
    )
}

export {Pagination};