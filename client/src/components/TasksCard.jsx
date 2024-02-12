import { Link } from "react-router-dom";
import { useTasks } from "../context"

export const TasksCard = ({ task }) => {

    const { deleteTask } = useTasks();

    return (
        <div className="bg-zinc-800 max-w-md w-full p-6 rounded-lg shadow-xl text-white">
            <header className="flex flex-wrap justify-between items-center mb-4">
                <h1 className="text-3xl font-semibold break-words">{task.title}</h1>
            </header>
            <p className="text-slate-300 mb-4 text-lg break-words">{task.description}</p>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <p className="text-slate-200 text-lg mb-2 sm:mb-0 w-full sm:w-auto">{new Date(task.date).toLocaleDateString()}</p>
                <div className="flex flex-wrap gap-x-2 gap-y-2 items-center">
                    <button className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-700 transition-colors" onClick={() => {
                        deleteTask(task._id);
                    }}>Delete</button>
                    <Link to={`/tasks/${task._id}`} className="bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-700 transition-colors">Edit</Link>
                </div>
            </div>
        </div>
    )
}