import React from 'react'


const Footer = () =>{
    return (
        <div className="bg-gray-900 p-4">
            <div className="container mx-auto text-center font-bold text-white">
                Projeto desenvolvido por: Crystyan Santos / {' '}
                <a className='hover:underline' href='https://www.linkedin.com/in/crystyan-santos-56a3943b/'Linkedin>Linkedin</a> / {' '}
                <a className='hover:underline' href='https://github.com/CrystyanSantos9'>Github</a>
                <div className='p-4'>
                    <img className='inline' src='/logo_semana_fsm.png' />
                    <img className='inline' src='/logo_devpleno.png'/>
                </div>
            </div>
        </div>
    )
}

export default Footer