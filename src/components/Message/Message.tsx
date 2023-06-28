import { updateMessages } from "../../redux/messages/messages"
import { IStore, MessagesType } from "../../redux/type"
import { useFetch } from "../../hook/useFetch"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useEffect } from "react"

import './message.scss'

const ChatMessage = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const userId = useSelector<IStore, number | null>((store) => store.Token.id)
    const messageList = useSelector<IStore, MessagesType>((store) => store.Messages)
    const { fetchData, returnData } = useFetch<undefined, MessagesType>('chats/' + id, 'GET', true)

    useEffect(() => {
        if(id && !isNaN(+id)) fetchData()
    }, [id])

    useEffect(() => {
        if(returnData) dispatch(updateMessages(returnData))
    }, [returnData])

    return <div className="">{messageList?.messages?.map((msg) => {
        return msg.message_creater.id !== userId ?
        <div key={msg.id} className="">
            <div className="">
                <div className="">
                    <p className="">{msg.message}</p>
                </div>
                <div className="">
                    <span className="">{msg.message_creater.login}</span>
                    <span className="">{new Date(msg.create_time).toLocaleTimeString()}</span>
                </div>
            </div>
        </div> :
        <div key={msg.id} className="">
            <div className="">
                <div className="g">
                    <p className="">{msg.message}</p>
                </div>
                <div className="">
                    <span className="">{msg.message_creater.login}</span>
                    <span className="">{new Date(msg.create_time).toLocaleTimeString()}</span>
                </div>
            </div>
        </div>}
    )}</div>
}

export default ChatMessage
