import { Outlet, NavLink, useLocation } from 'react-router-dom'
import './auth.scss'

const Auth = () => {

    const { pathname } = useLocation()

    return <main className='auth-main center-content'>
        <section className='auth-form'>
            <h1 className='text uppercase center title'>{ pathname === '/auth/registration' ? ' account registration' : 'account login' }</h1>
            <Outlet/>
        </section>
    </main>
}

export default Auth
