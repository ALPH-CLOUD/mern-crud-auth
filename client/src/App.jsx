import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider, TaskProvider } from "./context";
import { HomePage, LoginPage, RegisterPage, TaskFormPage, TasksPage, ProfilePage, ProtectedRoute } from "./pages/index.js";
import { Navbar } from "./components/Navbar.jsx";

export const App = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            {/* Public */}
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path='/tasks' element={<TasksPage />} />
              <Route path='/add-task' element={<TaskFormPage />} />
              <Route path='/tasks/:id' element={<TaskFormPage />} />
              <Route path='/profile' element={<ProfilePage />} />
            </Route>

          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}
