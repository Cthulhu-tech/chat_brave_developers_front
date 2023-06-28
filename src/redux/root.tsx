import { combineReducers, createStore } from "redux"
import { Token } from './token/token'
import { Chat } from './chat/chat'

export const rootReducer = combineReducers({
    Token,
    Chat
})
export const store = createStore(rootReducer)
