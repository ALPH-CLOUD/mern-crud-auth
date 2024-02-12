import { useForm } from "react-hook-form"
import { useTasks } from "../context";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const TaskFormPage = () => {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { createTask, getTask, updateTask } = useTasks();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        loadTask();
    }, [])

    const loadTask = async () => {
        if (params.id) {
            const task = await getTask(params.id);
            console.log(task)
            setValue('title', task.title)
            setValue('description', task.description)
            setValue('date', dayjs(task.date).utc().format('YYYY-MM-DD'))
        }
    }

    const onSubmit = handleSubmit((data) => {
        const dataValid = {
            ...data,
            date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
        }

        if (data.date) dataValid.date = dayjs.utc(data.date).format();

        if (params.id) {
            updateTask(params.id, dataValid);
        } else {
            createTask(dataValid);
        }
        navigate('/tasks')
    })

    return (
        <div className='flex justify-center'>
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                <form onSubmit={onSubmit}>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        placeholder="Title"
                        {...register("title", { required: "Title is required" })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        autoFocus
                    />
                    {errors.title && <h1 className="text-red-500">{errors.title.message}</h1>}
                    <label htmlFor="description">Description</label>
                    <textarea
                        rows="3"
                        placeholder="Description"
                        {...register("description", { required: "Description is required" })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md'
                    ></textarea>
                    {errors.description && <h1 className="text-red-500">{errors.description.message}</h1>}
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        {...register("date")}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md'
                    />
                    {errors.date && <h1 className="text-red-500">{errors.date.message}</h1>}
                    <button className="bg-indigo-500 px-3 py-2 rounded-md mt-5">Save</button>

                </form>
            </div>
        </div>
    )
}