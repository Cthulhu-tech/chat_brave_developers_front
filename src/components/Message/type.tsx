import { MessageType } from "../../redux/type"

export type Messages = {
    messages: MessageType[]
}

export type MessagesError = {
    error: string
}
