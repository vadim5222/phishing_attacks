import { useForm } from "react-hook-form";

const Login = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()
    return (
        <form onSubmit={handleSubmit((data) => console.log(data))}>
            <input {...register('firstName')} />
            <input {...register('lastName', { required: true })} />
            {errors.lastName && <p>Второе имя обязательно</p>}
            <input {...register('age', { pattern: /\d+/ })} />
            {errors.age && <p>Please enter number for age.</p>}
            <input type="submit" />
        </form>
    )
}
export default Login