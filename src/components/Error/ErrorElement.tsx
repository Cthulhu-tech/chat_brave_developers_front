import { Navigate, useLocation, useRouteError } from "react-router-dom"
import { AxiosError } from "axios"

import './error.scss'

export const ErrorElement = () => {

    const location = useLocation()
    const error = useRouteError() as AxiosError

    if(error.message === 'Request failed with status code 401' && location.pathname !== '/auth')
        return <Navigate to="auth" />

    return <div
        className="container-error center-content"
    >
        <div className='wrapper-text_error center-content'>
            <p className="text_big text">{error.message}</p>
        </div>
    </div>
}
