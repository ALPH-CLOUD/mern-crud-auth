import { useForm } from 'react-hook-form';
import { InputForm } from '../components/index.js';
import { useAuth } from '../context/AuthContex.jsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const RegisterPage = () => {

    const { register,
        handleSubmit,
        formState: {
            errors
        } } = useForm();

    const { signup, isAuthenticated, errors:RegisterErrors} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate('/tasks')
    }, [isAuthenticated])

    const onSubmit = handleSubmit(async (values) => {
        signup(values);
    })

    return (
        <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
            {
                RegisterErrors.map((error, i) => (
                    <div key = {i} className='bg-red-500 p-2 mb-2 text-white'>
                        {error}
                    </div>
                ))
            }
            <form
                onSubmit={onSubmit}>

                <InputForm typeInput={"text"} nameInput={'username'} handleInputState={register} placeholderInput={"Username"} />
                {errors.username && <p className='text-red-500'>Username is required</p>}

                <InputForm typeInput={"email"} nameInput={'email'} handleInputState={register} placeholderInput={"Email"} />
                {errors.email && <p className='text-red-500'>Email is required</p>}

                <InputForm typeInput={"password"} nameInput={'password'} handleInputState={register} placeholderInput={"Password"} />
                {errors.password && <p className='text-red-500'>Password is required</p>}

                <button type='submit'>
                    Register
                </button>
            </form>
        </div>
    )
}
