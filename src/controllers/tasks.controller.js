import Task from '../models/task.model.js';

// función para obtener todas las tareas
export const getTasks = async (req, res) => {
    try {
        // busca las tareas de todos los usuarios
        // const tasks = await Task.find();

        // buscar solo las tareas del usuario que está logueado y no mostrar el password ni el email
        const tasks = await Task.find({ user: req.user.id }).populate('user', '-password -email') 
        res.json(tasks);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" })
    }
}
// Función para crear una tarea una tarea
export const createTask = async (req, res) => {
    try {
        // extraer los datos del body
        const { title, description, date } = req.body;
        // crear una nueva tarea
        const newTask = new Task({
            title,
            description,
            date,
            user: req.user.id
        })
        // guardar la tarea en la base de datos
        const savedTask = await newTask.save();
        res.json(savedTask);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" })
    }
}
// funciòn para obtener una tarea por su id
export const getTask = async (req, res) => {
    try {
        // busca la tarea por su id y la relaciona con el usuario
        const task = await Task.findById(req.params.id).populate('user');
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json(task);
    } catch (error) {
        return res.status(404).json({ message: "Task not found" })
    }
}
// función para eliminar una tarea por su id
export const deleteTask = async (req, res) => {
    try {
        // Busca la tarea por su id y la elimina
        const task = await Task.findByIdAndDelete(req.params.id)
        // si no encuentra la tarea, devuelve un mensaje de error
        if (!task) return res.status(404).json({ message: "Task not found" });
        // si la tarea fue eliminada, devuelve un mensaje de éxito
        return res.sendStatus(204);
    } catch (error) {
        return res.status(404).json({ message: "Task not found" })
    }
}

export const updateTask = async (req, res) => {
    try {
        // Busca la tarea por su id y la actualiza con los datos del body
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
        // si no encuentra la tarea, devuelve un mensaje de error
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json(task)
    } catch (error) {
        return res.status(404).json({ message: "Task not found" })
    }
}
