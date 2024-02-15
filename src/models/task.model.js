import mongoose from 'mongoose';
// creación del esquema de tarea para la base de datos	
const taskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    }
}, {
        timestamps: true
    });

export default mongoose.model("Task", taskSchema);