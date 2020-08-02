import React, { useState } from 'react'
import Link from 'next/link'
import PageTitle from '../components/PageTitle'

const Pesquisa = () => {

    const notas = [0, 1, 2, 3, 4, 5]

    const [form, setForm] = useState({
        Nome: '',
        Email: '',
        Whatsapp: '',
        Comentario: '',
        Nota: ''
    })

    const [success, setSuccess] = useState(false)
    const [retorno, setRetorno] = useState({})

    const onChange = evt => {
        const value = evt.target.value
        const key = evt.target.name

        setForm(old => ({
            ...old,
            [key]: value
        }))
    }

    const save = async () => {
        try {
            const response = await fetch('/api/save', {
                method: 'POST',
                body: JSON.stringify(form)
            })
            const data = await response.json()
            setSuccess(true)
            setRetorno(data)
        } catch (err) {

        }
    }

    return (
        <div className='pt-6'>
            <PageTitle title='Pesquisa'/>
            <h1 className='text-center py-3 text-3xl'>Críticas ou sugestões</h1>
            <p className="text-center mb-6">O Combo Lanches JPA sempre busca por entender melhor a necessidade   de seus clientes.<br />
            Por isso, estamos sempre abertos a ouvir à sua opinião.
            </p>

            {!success && <div className="w-64 mx-auto justify-center">

                <label className='font-bold'>Seu nome:</label>
                <input type="text" className='p-4 block shadow bg-blue-200 m-2 rounded' placeholder="Nome" onChange={onChange} name="Nome" value={form.Nome} />

                <label className='font-bold'>Email:</label>
                <input type="text" className='p-4 block shadow bg-blue-200 m-2 rounded' placeholder='Seu email' onChange={onChange} name="Email" value={form.Email} />

                <label className='font-bold'>Whatsapp:</label>
                <input type="text" className='p-4 block shadow bg-blue-200 m-2 rounded' placeholder='Nº do Whatsapp' onChange={onChange} name="Whatsapp" value={form.Whatsapp} />

                <label className='font-bold'>Sua Crítica ou sugestão:</label>
                <input type="text" className='p-4 block shadow bg-blue-200 m-2 rounded ' placeholder="Seu comentário" onChange={onChange} name="Comentario" value={form.Comentario} />

                <label className='font-bold'>Nota:</label>
                <div className='flex py-6'>
                    {notas.map(nota => {
                        return (
                            <label className="block w-1/6">
                                {nota}<br />
                                <input type='radio' name='Nota' value={nota} onChange={onChange}/>
                            </label>
                        )
                    })
                    }
                </div>

                <button className='bg-blue-400 px-12 py-4 font-bold rounded-lg shadow-lg hover:shadow m-2' onClick={save}>Enviar</button>

            </div>
            }

            {success &&
                <div className="w-48 mx-auto">

                    <p className='text-center mb-6 bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3'>Obrigador por contribuir com sua opinião ou crítica.</p>
                    {
                        retorno.showCupom && <div className="text-center border p-4 mb-6 text-1xl">
                            Seu cupom: <br />
                            <span className='font-bold'>{retorno.CUPOM}</span>
                        </div>
                    }
                    {
                        retorno.showCupom && <div className="text-center border p-4 mb-6">

                            <span className='font-bold block mb-2'>{retorno.PROMO}</span>
                            <br />
                            <span className='italic'>Tire um print ou foto desta tela e apresente no seu próximo pedido.</span>
                        </div>

                    }
                </div>
            }

        </div>
    )
}

export default Pesquisa