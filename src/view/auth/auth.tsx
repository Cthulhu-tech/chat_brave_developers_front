import { Outlet, NavLink } from 'react-router-dom'
import './auth.scss'

const Auth = () => {
    
    return <>
        <section className='navigation-auth glass-effect center-content'>
            <NavLink to='login' className='navigation-link text'>Login</NavLink>
            <NavLink to='registration' className='navigation-link text'>Registration</NavLink>
        </section>
        <section className='auth-form'>
            <Outlet/>
        </section>
    </>
}

export default Auth
