import { useEffect } from "react";
import { useTasks } from "../context";
import { TasksCard } from "../components/TasksCard";

export const TasksPage = () => {

    const { getTasks, tasks } = useTasks();

    useEffect(() => {
        getTasks();
    },[])

    if (tasks.length === 0) {
        return <h1>No tasks</h1>
    }
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
            {
                tasks.map((task) => (
                    <TasksCard key={task._id} task={task}/>
                ))
            }
        </div>
    )
}
