import { InputForm } from "../components";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContex";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signin, errors: LoginErrors, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const onSubmit = handleSubmit((data) => {
        signin(data);
    });

    useEffect(() => {
        if (isAuthenticated) navigate('/tasks');
    },[isAuthenticated])

    return (
        <div className="flex   justify-center">
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
                {LoginErrors.map((error, i) => (
                    <div key={i} className="bg-red-500 p-2 mb-2 text-white text-center">
                        {error}
                    </div>
                ))}
                <h1 className="text-2xl font-bold mb-4">Login</h1>

                <form onSubmit={onSubmit}>

                    <InputForm typeInput="email" nameInput="email" handleInputState={register} placeholderInput="Email" />
                    {errors.email && <p className="text-red-500">Email is required</p>}

                    <InputForm typeInput="password" nameInput="password" handleInputState={register} placeholderInput="Password" />
                    {errors.password && <p className="text-red-500">Password is required</p>}

                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-1">
                        Login
                    </button>
                </form>

                <p className="flex gap-x-1 justify-between mt-2">
                    Don't have an account? <Link to="/register" className="text-sky-500 cursor-pointer mr-3">Sign up</Link>
                </p>

            </div>
        </div>
    );
};
