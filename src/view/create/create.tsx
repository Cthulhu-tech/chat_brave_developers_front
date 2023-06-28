import { NavLink, useNavigate } from "react-router-dom"
import { useFetch } from "../../hook/useFetch"
import { ChatsData, CreateType } from "./type"
import { useForm } from 'react-hook-form'
import { useEffect } from "react"

import './create.scss'

const Create = () => {

    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, getValues } = useForm<CreateType>()
    const { fetchData, returnData }= useFetch<CreateType, ChatsData>('chats/', 'POST', true)

    const handlerCreate = handleSubmit((data) => fetchData(data))

    useEffect(() => {
        if(returnData?.id) navigate('/')
    }, [returnData])

    return <>
        <h1 className='text uppercase center title'>Create</h1>
        <form onSubmit={handlerCreate} className="container-create_form center-content">
            <div className="wrapper-input">
                <span className="text text_meddium uppercase">room name</span>
                <div className="">
                    <input
                        type="text"
                        className="input text_big"
                        placeholder='room name'
                        {...register('name', { 
                            required: "Minimum length 3 character.",
                            min: 3,
                        })}
                    />
                </div>
                {errors.name && <p className="text text-error text_small">{ errors.name.message }</p>}
            </div>
            <div className="wrapper-input">
                <span className="text text_meddium uppercase">password</span>
                <div className="">
                    <input
                        type="password"
                        className="input text_big"
                        placeholder='password'
                        {...register('password', {
                            required: "Password between 6-20 characters which contain at least one numeric digit, one uppercase and one lowercase letter",
                            pattern: {
                                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
                                message: "Password between 6-20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"
                            },
                        })}
                    />
                </div>
                {errors.password && <p className="text text-error text_small">{ errors.password.message }</p>}
            </div>
            <div className="btn-wrapper-create">
                <button type="submit" className="btn text_meddium capitalize">create chat</button>
                <NavLink to='/' className='navigation-link text'>Back</NavLink>
            </div>
        </form>
    </>
}

export default Create
