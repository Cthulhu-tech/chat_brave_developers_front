import { useCallback, useEffect, useState } from 'react'
import { updateChatList } from '../../redux/chat/chat'
import { useDispatch, useSelector } from 'react-redux'
import { ChatsType, IStore } from '../../redux/type'
import { useFetch } from '../../hook/useFetch'
import { NavLink } from 'react-router-dom'

import './chat.scss'

import { Skeleton } from '../Skeleton/Skeleton'
import { DeleteChat } from './delete'
import { ChatId } from './type'

const Chat = () => {

  const dispatch = useDispatch()
  const token = useSelector<IStore, string>((store) => store.Token.user)
  const chatList = useSelector<IStore, ChatsType[]>((store) => store.Chat)
  const { fetchData, returnData, loading } = useFetch<undefined, ChatsType[]>('chats', 'GET', true)

  const [id, setChatId] = useState<ChatId>({ chatId: null })

  const chatIdHandler = useCallback((id: number | null) => setChatId({ chatId: id }), [])
  useEffect(() => {
      fetchData()
  }, [])

  const update = () => fetchData()

  useEffect(() => {
    if(returnData.length > 0) dispatch(updateChatList(returnData))
  }, [returnData])

  if(loading) return <section className="container-chat glass-effect center-content">
    <Skeleton/>
  </section>

  return <section className="container-chat glass-effect center-content">
    <article className='container-chat-list'>
      {Array.isArray(chatList) && chatList?.length > 0 ?
        chatList?.map((chat) =>
          <div key={chat.id} className='chat-data text'>
            <span className='text-span'>Name:
              <p>{chat.name}</p>
            </span>
            <span className='text-span'>Creater:
              <p>{chat.chat_creater.login}</p>
            </span>
            <span className='text-span'>Date create: 
              <p>{new Date(chat.create_time).toLocaleString()}</p>
            </span>
            {chat.chat_creater.login === token &&
            <div className='text-span'>
              <p></p>
              <DeleteChat
                id={chat.id}
                chatIdHandler={chatIdHandler}
              />
            </div>}
          </div>) :
        <div className='center-content container-chat-list'>
          <p className='text text_big'>List empty</p>
        </div>}
    </article>
    <div className="create-chat">
      <NavLink to="/create" className='title text'>Create</NavLink>
      <span className='title text pointer' onClick={update}>Update</span>
    </div>
  </section>
}

export default Chat
