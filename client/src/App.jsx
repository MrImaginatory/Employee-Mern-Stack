import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AddEmployee from './components/addEmp'
import EmployeeData from './components/employeeData'
import LoginForm from './components/loginForm'
import RegisterForm from './components/registerForm'
import UpdatePage from './components/updatePage'


function App() {

  return (
<BrowserRouter>
<Routes>
  <Route path="/" element={<LoginForm/>}/>
  <Route path="/login" element={<LoginForm/>}/>
  <Route path="/register" element={<RegisterForm/>}/>
  <Route path="/add" element={<AddEmployee/>}/>
  <Route path='/employeeData' element={<EmployeeData/>}/>
  <Route path='/updateEmployee/:id' element={<UpdatePage/>}/>
</Routes>
</BrowserRouter>
  )
}

export default App
