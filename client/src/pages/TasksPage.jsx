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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {
                tasks.map((task) => (
                    <TasksCard key={task._id} task={task}/>
                ))
            }
        </div>
    )
}
