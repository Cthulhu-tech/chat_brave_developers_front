import { combineReducers, createStore } from "redux"
import { Messages } from './messages/messages'
import { Token } from './token/token'
import { Chat } from './chat/chat'

export const rootReducer = combineReducers({
    Token,
    Chat,
    Messages
})
export const store = createStore(rootReducer)
