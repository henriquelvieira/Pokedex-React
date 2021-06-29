function Layout({ 
    page_name,
    children, 
  }) {
    return (
        <div id="wrapper">
                
                {page_name && (
            
                <header id="header" className="alt">
                    <h1>{page_name}</h1>
                </header>
                )}

                <div id="main">
                    {children}
                </div>

        </div>
    )
  }
  
  
  
  
  export { Layout };