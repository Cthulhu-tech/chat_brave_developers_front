import { RefreshLoader } from "../utils/refresh/refresh"
import { createBrowserRouter } from "react-router-dom"
import { Suspense, lazy } from 'react'

import { ErrorElement } from "../components/Error/ErrorElement"
import { Skeleton } from "../components/Skeleton/Skeleton"
import { Layout } from '../components/Layout/Layout'

const Auth = lazy(() => import("../view/auth/auth"))
const Login = lazy(() => import("../view/login/login"))
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
                        <div></div>
                    </Suspense>
            },
            {
                path: '/create',
                element: <Suspense fallback={<Skeleton/>}>
                        <div>create</div>
                    </Suspense>
            },
        ]
    },
    {
        path: 'auth',
        element: <Layout>
            <Auth/>
        </Layout>,
        children: [
            {
                index: true,
                path: 'login',
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
