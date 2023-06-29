import { Navigate, useLocation, useRouteError } from "react-router-dom"
import { AxiosError } from "axios"
import { ErrorType } from "./type"
import { useEffect } from 'react'

import './error.scss'

export const ErrorElement = ({ customError, callback }: ErrorType) => {

    const location = useLocation()
    const error = useRouteError() as AxiosError || {
        message: ''
    }

    useEffect(() => {
        if(typeof callback === 'function') callback()
    }, [callback])

    if(error.message === 'Request failed with status code 401' && location.pathname !== '/auth')
        return <Navigate to="auth" />

    return <div
        className="container-error center-content"
    >
        <div className='wrapper-text_error center-content'>
            <p className="text_big text">{customError || error.message}</p>
        </div>
    </div>
}
