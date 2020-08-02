import React from 'react'
import Link from 'next/link'
import styles from './styles.module.css'


const Header = () => {
    return (
        <React.Fragment>
            <div className={styles.wrapper}>
                <div className='container mx-auto'>
                <Link href='/'>
                    <img className={'sm:max-w-xs mx-auto ' + styles.logo} src="/logo.png" alt="PalpitBox" />
                </Link>
                </div>
            </div>

            <div className='bg-yellow-400 p-4 shadow-md text-center'>
                <Link href='/sobre'>
                    <a className='px-4 hover:underline'>Sobre</a>
                </Link>
                <Link href='/contato'>
                    <a className='px-4 hover:underline'>Contato</a>
                </Link>
                <Link href='/pesquisa'>
                    <a className='px-4 hover:underline'>Pesquisa</a>
                </Link>
            </div>
        </React.Fragment>
    )

}

export default Header