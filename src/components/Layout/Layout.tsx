import { Outlet } from 'react-router-dom'
import './layout.scss'

export const Layout = (props: React.PropsWithChildren<{
    children?: React.ReactNode
  }>) => {
    return <>
    <nav className='container-navigation glass-effect'></nav>
    <main className='container-main'>
        {props?.children || <Outlet/>}
    </main>
    </>
}