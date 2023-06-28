import { RefreshLoader } from "../utils/refresh/refresh"
import { createBrowserRouter } from "react-router-dom"
import { Suspense, lazy } from 'react'

import { ErrorElement } from "../components/Error/ErrorElement"
import { Skeleton } from "../components/Skeleton/Skeleton"
import { Layout } from '../components/Layout/Layout'

const Chat = lazy(() => import('../components/Chat/Chat'))

const Auth = lazy(() => import("../view/auth/auth"))
const Login = lazy(() => import("../view/login/login"))
const Create = lazy(() => import("../view/create/create"))
const Registration = lazy(() => import("../view/registration/registration"))

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        errorElement: <ErrorElement/>,
        loader: () => RefreshLoader(),
        children: [
            {
                index: true,
                element: <Suspense fallback={<Skeleton/>}>
                        <Chat/>
                    </Suspense>
            },
            {
                path: '/create',
                element: <Suspense fallback={<Skeleton/>}>
                        <Create/>
                    </Suspense>
            },
        ],
    },
    {
        path: '/auth',
        element: <Auth/>,
        children: [
            {
                index: true,
                element: <Suspense fallback={<Skeleton/>}>
                    <Login/>
                </Suspense>
            },
            {
                path: 'registration',
                element: <Suspense fallback={<Skeleton/>}>
                    <Registration/>
                </Suspense>
            },
        ]
    },
])
