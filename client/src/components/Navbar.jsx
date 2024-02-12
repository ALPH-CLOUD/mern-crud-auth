import { Link } from 'react-router-dom';
import { useAuth } from '../context';

export const Navbar = () => {

    const { isAuthenticated, logout, user } = useAuth();

    return (
<nav className="bg-zinc-700 my-3 flex flex-col sm:flex-row justify-between py-5 px-10 text-white">
<Link to={
    isAuthenticated ? "/tasks" : "/"
} className="mb-4 sm:mb-0 text-center sm:text-left">
    <h1 className='text-2xl font-bold'>Tasks Manager</h1>
</Link>
            <ul className="flex flex-col sm:flex-row gap-y-2 sm:gap-x-2 items-center">
                {isAuthenticated ? (
                    <>
                        <li className="mr-4">
                            Welcome, {user.username}
                        </li>
                        <div className="flex">
    <li>
        <Link 
            to='/add-task'
            className='inline-block  text-white px-4 py-2 rounded hover:bg-zinc-600 transition-colors'
        >Add Task</Link>
    </li>
    <li className="ml-2">
        <Link 
            to='/'
            onClick={() => {
                logout();
            }}
            className='inline-block text-white px-4 py-2 rounded hover:bg-zinc-600 transition-colors'
        >
            Logout
        </Link>
    </li>
</div>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to='/login'
                                className='inline-block  text-white px-4 py-2 rounded hover:bg-zinc-600 transition-colors'
                            >Login</Link>
                        </li>
                        <li className="ml-2">
                            <Link 
                                to='/register'
                                className='inline-block  text-white px-4 py-2 rounded hover:bg-zinc-600 transition-colors'
                            >Register</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}