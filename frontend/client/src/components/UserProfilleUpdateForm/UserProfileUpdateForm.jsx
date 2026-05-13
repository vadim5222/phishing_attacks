import { useForm } from "react-hook-form"
import AxiosRequest from "../AxiosRequest"
import { useState } from "react"

const UserProfileUpdateForm = ({ userId }) => {

    const { register, handleSubmit } = useForm()

    const onEdit = async (data) => {
        try {
            const formData = new FormData()
            if (data.username) {
                formData.append('username', data.username)
            }
            if (data.email) {
                formData.append('email', data.email)
            }
            const response = await AxiosRequest.patch(`accounts/profile/${userId}/`,
                formData
            )
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <div className="flex items-start justify-center">
                <form className="p-4 md:p-6 lg:p-8 bg-cyan-950 w-full rounded-xl" onSubmit={handleSubmit(onEdit)}>
                    <div>
                        <label className='block text-sm font-medium text-blue-300-700 mb-1' htmlFor="username">username</label>
                        <input className='w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500' type="text" {...register('username')} />
                        <label className='block text-sm font-medium text-blue-300-700 mb-1' htmlFor="email">email</label>
                        <input className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500' type="email" {...register('email')} />
                        <button className='w-1/2 my-5 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500' type="submit">Сохранить</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default UserProfileUpdateForm