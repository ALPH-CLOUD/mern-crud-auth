import { BrowserRouter, Routes, Route } from "react-router-dom"

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<h1>Home page</h1>}/>
        <Route path='/login' element={<h1>login</h1>}/>
        <Route path='/register' element={<h1>register</h1>}/>
        <Route path='/task' element={<h1>Task page</h1>}/>
        <Route path='/add-task' element={<h1>new task</h1>}/>
        <Route path='/tasks/:id' element={<h1>update task</h1>}/>
        <Route path='/profile' element={<h1>profile</h1>}/>
      </Routes>
    </BrowserRouter>
  )
}
