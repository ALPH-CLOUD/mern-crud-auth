import { useForm } from 'react-hook-form';
import { InputForm } from '../components/index.js';
import { registerRequest } from '../api/auth.js';
export const RegisterPage = () => {

    const {register, handleSubmit } = useForm();

    const onSubmit = handleSubmit(async(values) => {
        const res = await registerRequest(values)
        console.log(res);
    })

    return (
        <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
            <form 
                onSubmit={onSubmit}>

                <InputForm typeInput={"text"} nameInput={'username'} handleInputState={register} placeholderInput={"Username"}/>
                <InputForm typeInput={"email"} nameInput={'email'} handleInputState={register} placeholderInput={"Email"}/>
                <InputForm typeInput={"password"} nameInput={'password'} handleInputState={register} placeholderInput={"Password"}/>
                
                <button type='submit'>
                    Register
                </button>
            </form>
        </div>
    )
}
