import { ChangeEvent, useContext, useEffect, useState, memo, useCallback } from 'react'
import { IStore, MessageType, TokenType } from "../../redux/type"
import { redirect, useParams } from "react-router-dom"
import { SocketContext } from "../../context/socket"
import { ErrorElement } from "../Error/ErrorElement"
import { Messages, MessagesError } from "./type"
import { Skeleton } from '../Skeleton/Skeleton'
import { useSelector } from "react-redux"

import './message.scss'

const ErrorElementMemo = memo(ErrorElement)

const ChatMessage = () => {

    const { id } = useParams()
    const socket = useContext(SocketContext)
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState({ message: '', error: false})
    const [allMessage, setAllMessage] = useState<MessageType[]>([])
    const token = useSelector<IStore, TokenType>((store) => store.Token)
    const login = useSelector<IStore, string>((store) => store.Token.user)
    const changeMessage = (e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)

    const createMessage = () => {
        if(message) socket.emit('CREATE_MESSAGE', {
            message,
            user: token.id,
            room: id,
        })
        setMessage(() => '')
    }

    const returnBack = useCallback(() => redirect('/'), [id])

    useEffect(() => {

        socket.emit('JOIN_ROOM', { 
            room_id: id,
            user_id: token.id
        })
        socket.emit('FIND_ALL_MESSAGE', { chatId: id })
        socket.on('FIND_ALL_MESSAGE', (data: Messages | MessagesError) => {
            setLoading(false)
            console.log(data)
            if((data as Messages)?.messages) setAllMessage((data as Messages)?.messages)
            if((data as MessagesError)?.error) setError({ message: (data as MessagesError)?.error, error: true})
        })
        socket.on('CREATE_MESSAGE', (data: MessageType) => {
            console.log(data)
            setAllMessage([...allMessage, data])
        })

        return () => {
            socket.close()
            socket.off('FIND_ALL_MESSAGE')
            socket.off('CREATE_MESSAGE')
        }

    }, [socket])

    if(loading) return <section className="container-message glass-effect">
        <Skeleton/>
    </section>

    if(error.error) return <ErrorElementMemo
        callback={returnBack}
        customError={error.message + ' Chat - ' + id}
    />

    return <section className="container-message glass-effect">
        <div className="wrapper-message">
            <div className="chat">{allMessage?.map((msg) => {
                return msg.message_creater.login !== login ?
                <div key={msg.id} className="message">
                    <div className="">
                        <p className="text text_meddium">{msg.message}</p>
                        <div className="message-info">
                            <span className="text text_small">{msg.message_creater.login}</span>
                            <span className="text text_small">{new Date(msg.create_time).toLocaleTimeString()}</span>
                        </div>
                    </div>
                </div> :
                <div key={msg.id} className="message you">
                    <div className="">
                        <p className="text text_meddium">{msg.message}</p>
                        <div className="message-info">
                            <span className="text text_small">{msg.message_creater.login}</span>
                            <span className="text text_small">{new Date(msg.create_time).toLocaleTimeString()}</span>
                        </div>
                    </div>
                </div>}
            )}</div>
        </div>
        <div className="container-message_set">
            <div className="wrapper-message_button">
                <input
                    onChange={changeMessage}
                    className="input text_big"
                    type="text"
                    placeholder="Type your message…"
                    value={message}
                />
                <button
                    onClick={createMessage}
                    className="btn text_meddium capitalize send-message"
                >send</button>
            </div>
        </div>
    </section>
}

export default ChatMessage
