import { BrowserRouter, Routes, Route } from "react-router-dom"
import { LoginPage, RegisterPage } from "./pages/index.js";
import { AuthProvider } from "./context/AuthContex.jsx";

export const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<h1>Home page</h1>} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/tasks' element={<h1>Task page</h1>} />
          <Route path='/add-task' element={<h1>new task</h1>} />
          <Route path='/tasks/:id' element={<h1>update task</h1>} />
          <Route path='/profile' element={<h1>profile</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
