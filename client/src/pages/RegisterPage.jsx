import { useForm } from 'react-hook-form';
import { InputForm } from '../components/index.js';
import { useAuth } from '../context/AuthContex.jsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const RegisterPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signup, isAuthenticated, errors: RegisterErrors } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate('/login');
    }, [isAuthenticated]);

    const onSubmit = handleSubmit(async (values) => {
        signup(values);
    });

    return (
        <div className='flex h-screen items-center justify-center'>
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                {RegisterErrors.map((error, i) => (
                    <div key={i} className='bg-red-500 p-2 mb-2 text-white text-center'>
                        {error}
                    </div>
                ))}
                <h1 className='text-2xl font-bold mb-4'>Register</h1>
                <form onSubmit={onSubmit}>
                    <InputForm typeInput='text' nameInput='username' handleInputState={register} placeholderInput='Username' />
                    {errors.username && <p className='text-red-500'>Username is required</p>}

                    <InputForm typeInput='email' nameInput='email' handleInputState={register} placeholderInput='Email' />
                    {errors.email && <p className='text-red-500'>Email is required</p>}

                    <InputForm typeInput='password' nameInput='password' handleInputState={register} placeholderInput='Password' />
                    {errors.password && <p className='text-red-500'>Password is required</p>}

                    <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'>
                        Register
                    </button>
                </form>

                <p className='flex gap-x-2 justify-between mt-2'>
                    Already have an account? <Link to='/login' className='text-sky-500 cursor-pointer mr-3'>Login</Link>
                </p>
            </div>
        </div>
    );
}
