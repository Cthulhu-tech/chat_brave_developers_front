import reportWebVitals from './reportWebVitals'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/root'
import { App } from './App'

import './style/global.scss'
import './style/text.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
<Provider store={store}>
    <App />
</Provider>)

reportWebVitals()
