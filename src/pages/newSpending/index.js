import { useState } from 'react'

import Header from '../../components/header'
import TalkToChatbot from '../../components/talkToChatbot'

import './style.css'

function NewSpending({ history }) {
    const [date, setDate] = useState(undefined)
    const [value, setValue] = useState(0)
    const [description, setDescription] = useState('')
    const [type, setType] = useState(0)
    
    const handleFormSubmit = e => {
        e.preventDefault()
        history.goBack()
    }

    return (
        <div className='pagina-novo-gasto'>
            <Header title='Novo gasto' history={history} alternativeStyle noChatbot />

            <div className="conteudo">
                <form onSubmit={handleFormSubmit}>
                    <label htmlFor='date'>Data:</label>

                    <input
                        id='date'
                        name='date'
                        type='date'
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        required
                    />

                    <label htmlFor='value'>Valor (R$):</label>

                    <input
                        id='value'
                        name='value'
                        type='number'
                        min="0.01"
                        step="0.01"
                        max="9999999"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        required
                    />

                    <label htmlFor='type'>Tipo:</label>

                    <div className="checkboxes">
                        <label>
                            <input
                                id='type'
                                name='type'
                                type='checkbox'
                                checked={type === 0}
                                onChange={e => setType(0)}
                            />

                            <span>Recebi</span>
                        </label>

                        <label>
                            <input
                                id='type'
                                name='type'
                                type='checkbox'
                                checked={type === 1}
                                onChange={e => setType(1)}
                            />
                            
                            <span>Paguei</span>
                        </label>
                    </div>


                    <label htmlFor='date'>Descrição:</label>

                    <input
                        id='description'
                        name='description'
                        type='description'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder='O que foi?'
                    />

                    <button className='salvar' type="submit">
                        Salvar
                    </button>
                </form>

                <TalkToChatbot />
            </div>
        </div>
    )
}

export default NewSpending
