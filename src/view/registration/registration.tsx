import { updateToken } from "../../redux/token/token"
import { useNavigate } from "react-router-dom"
import { useFetch } from '../../hook/useFetch'
import { TokenType } from "../../redux/type"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { UserRegistration } from "./type"
import { useEffect } from "react"

const Registration = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, } = useForm<UserRegistration>()

    const { fetchData, returnData, error } = useFetch<UserRegistration, TokenType>('users', 'POST')

    const handlerRegistration = handleSubmit((data) => fetchData(data))

    useEffect(() => {
      if(!error.message && returnData.id){
        dispatch(updateToken(returnData.access))
        navigate('/')
      }
    }, [returnData])

    return <>
        <form onSubmit={handlerRegistration} className="container-auth_form center-content">
            <div className="wrapper-input">
                <span className="text text_meddium">Login</span>
                <input className="input text_big" {...register('login', { required: "Login is required." })} />
                {errors.login && <p className="text text-error text_small">{ errors.login.message }</p>}
            </div>

            <div className="wrapper-input">
                <span className="text text_meddium">Password</span>
                <input
                type="password" placeholder='password' className="input text_big"
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
            
            <button className="btn text_big">registration</button>
        </form>
        {error.message && <p className="text text-error text_small">{ error.message }</p>}
    </>
}

export default Registration
