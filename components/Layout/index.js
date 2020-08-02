import React from 'react'
import Header from '../Header'
import Footer from '../Footer'


const Layout = ({children}) =>{
    return(
        <div>
            <div>
            <Header />
                <div className="container mx-auto">
                    {children}
                </div>
            <Footer />  
            </div>
        </div>
    )
}

export default Layout