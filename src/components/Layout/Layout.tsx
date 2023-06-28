import { Outlet } from 'react-router-dom'
import './layout.scss'

export const Layout = (props: React.PropsWithChildren<{
    children?: React.ReactNode
  }>) => {
    return <main className='container-main'>
        {props?.children || <Outlet/>}
    </main>
}