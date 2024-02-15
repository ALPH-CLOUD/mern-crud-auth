import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/tasks.routes.js';
import cors from 'cors';

const app = express();
// configuración de cors para permitir peticiones desde el frontend
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
// morgan es un middleware que nos permite ver en consola las peticiones que llegan al servidor
app.use(morgan('dev'));
// cookieParser es un middleware que nos permite leer las cookies que llegan en las peticiones
app.use(cookieParser());
// express.json() es un middleware que nos permite leer los datos que llegan en las peticiones en formato json
app.use(express.json());

// rutas
app.use("/api", authRoutes);
app.use("/api", taskRoutes);

export default app;
