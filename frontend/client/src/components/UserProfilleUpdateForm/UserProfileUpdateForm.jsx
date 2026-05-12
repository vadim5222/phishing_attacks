import { useForm } from "react-hook-form"
import AxiosRequest from "../AxiosRequest"
import { useState } from "react"

const UserProfileUpdateForm = ({userId}) => {

    const {register, handleSubmit} = useForm()

    const onEdit = async(data) => {
        try{
            const formData = new FormData()
            formData.append('username', data.username)
            formData.append('email', data.email)
            const response = await AxiosRequest.put(`accounts/profile/${userId}/`,
                formData
            )
            console.log(response)
        }catch(e){
            console.log(e)
        }
    }

    return(
        <>
        <div>
            <form onSubmit={handleSubmit(onEdit)}>
                <div>
                    <input type="text" {...register('username')}/>
                    <input type="email" {...register('email')}/>
                    <button type="submit">Сохранить</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default UserProfileUpdateForm