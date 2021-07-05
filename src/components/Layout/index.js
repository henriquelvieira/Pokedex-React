import { useLoading } from '../../hooks/useLoading';


function Layout({ 
    page_name,
    children, 
}) {

    //Importação do state loading e o Componente Loading do Hook useLoading
    const { loading, Loading } = useLoading();
    
    return (
        <div id="wrapper">
                
                {page_name && (           
                    <header id="header" className="alt">
                        <h1>{page_name}</h1>
                    </header>
                )}

                <div id="main">
                    <Loading status = {loading}  />
                    {children}
                </div>

        </div>
    )
  }
  
  
  
  
  export { Layout };