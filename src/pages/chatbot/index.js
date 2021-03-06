import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { getChatbotAnswer } from '../../repo/chatbotRepo'

import HouseImg from '../../assets/img/house.svg'
import ZeImg from '../../assets/img/ze.jpg'
import ExpandArrowImg from '../../assets/img/expandArrow.svg'

import './style.css'

function Chatbot() {
    const [messages, setMessages] = useState([])
    const [inputText, setInputText] = useState('')
    const bottomOfMessagesRef = useRef(null)

    useEffect(() => {
        setTimeout(() => {
            const now = new Date()
            const nowStr = `${now.getHours()}:${now.getMinutes()}`
            setMessages([
                { sender: 'ze', text: 'Opa! Tudo bem?', time: nowStr },
                { sender: 'ze', text: 'Que que eu posso te ajudar?', time: nowStr }
            ])

            bottomOfMessagesRef.current.scrollIntoView()
        }, 500)
    }, [])

    const handleInputOnChange = (e) => {
        setInputText(e.target.value)
    }

    const handleSendText = async (e) => {
        e.preventDefault()

        try {
            const answer = await getChatbotAnswer(inputText)

            const now = new Date()
            const nowStr = `${now.getHours()}:${now.getMinutes()}`
            
            setMessages([
                ...messages,
                { sender: 'user', text: inputText, time: nowStr },
                { sender: 'ze', text: answer, time: nowStr }
            ])

            setInputText('')

            bottomOfMessagesRef.current.scrollIntoView()
        } catch (error) {
            alert('Houve um problema falando com o Seu Zé \nTenta de novo')
        }
    }
    
    return (
        <div className='pagina-ze'>
            <div className="topo">
                <Link to='/' className='casa'>
                    <img src={HouseImg} alt='Símbolo de casa' />
                </Link>

                <h1 className='titulo'>Seu Zé</h1>

                <img className='ze' src={ZeImg} alt='Zé' />
            </div>

            <div className="mensagens">
                {messages.map((message, i) => (
                    <div className={`mensagem ${message.sender === 'ze' ? 'ze' : 'usuario'}`} key={i}>
                        <span className="texto">{message.text}</span>
                        <span className="hora">{message.time}</span>
                    </div>
                ))}

                <div ref={bottomOfMessagesRef}></div>
            </div>

            <form className="fundo" onSubmit={handleSendText}>
                <input
                    type="text"
                    value={inputText}
                    onChange={handleInputOnChange}
                    onSubmit={handleSendText}
                />

                <button type='submit'>
                    <img className='seta' src={ExpandArrowImg} alt='seta' />
                </button>
            </form>
        </div>
    )
}

export default Chatbot
