import { deleteChatList } from "../../redux/chat/chat"
import { useFetch } from "../../hook/useFetch"
import { useDispatch } from "react-redux"
import { useEffect } from "react"

export const DeleteChat = ({ id }: { id: number }) => {

    const dispatch = useDispatch()
    const { fetchData, returnData } = useFetch<undefined, { message: string }>('chats/' + id, 'DELETE', true)
    
    const deleteChat = () => fetchData()

    useEffect(() => {
        if(returnData.message === 'Chat delete') {
            dispatch(deleteChatList(id))
        }
    }, [returnData])

    return <p onClick={deleteChat} className="text text-error uppercase pointer">delete</p>
}
