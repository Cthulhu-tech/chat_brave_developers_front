import { updateToken } from "../../redux/token/token"
import { useNavigate } from "react-router-dom"
import { useFetch } from "../../hook/useFetch"
import { TokenType } from "../../redux/type"
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import { UserLogin } from "./type"
import { useEffect } from 'react'

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors }, } = useForm<UserLogin>()
    const { fetchData, returnData, error }= useFetch<UserLogin, TokenType>('auth/login', 'POST')

    const handlerLogin = handleSubmit((data) => fetchData(data))

    useEffect(() => {
        console.log(error.message)
        if(!error.message && returnData?.access){
          dispatch(updateToken(returnData.access))
          navigate('/')
        }
      }, [returnData])

    return <>
    <form onSubmit={handlerLogin} className="container-auth_form center-content">
        <div className="wrapper-input">
            <span className="text text_meddium">Login</span>
            <input type='text' className="input text_big" {...register('login', { required: "Email is required." })} />
            {errors.login && <p className="text text-error text_small">{ errors.login.message }</p>}
        </div>
        <div className="wrapper-input">
            <span className="text text_meddium">Password</span>
            <input type="password" placeholder='password' className="input text_big"
                {...register('password', {
                    required: "Password between 6-20 characters which contain at least one numeric digit, one uppercase and one lowercase letter",
                    pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
                    message: "Password between 6-20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"
                    },
                })}
            />
            {errors.password && <p className="text text-error text_small">{ errors.password.message }</p>}
        </div>
        <button className="btn text_big">login</button>
    </form>
    {error.message && <p className="text text-error text_small">{ error.message }</p>}
    </>
}

export default Login
