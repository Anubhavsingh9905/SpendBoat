import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import AddExpense from './pages/AddExpenses'
import Register from './components/Register'
import Profile from './pages/Profile'
import History from './pages/History'
import { useAuth } from './context/AuthContext'
import {Navigate} from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const Protected = ({children}) => {
  const {isAuthenticated, isLoading} = useAuth();

  if(isLoading){
    return(
      <div className="flex justify-center items-center h-screen w-full">
        <Loader2 size={240} className='animate-spin '></Loader2>
      </div>
    )
  }

  if(!isAuthenticated){
    console.log(isAuthenticated)
    return <Navigate to="/" replace/>;
  }

  return children;
}

function App() {


  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/dashboard' element={<Protected><Dashboard/></Protected>}/>
      <Route path='/profile' element={<Protected><Profile/></Protected>}/>
      <Route path='/addexpenses' element={<Protected><AddExpense/></Protected>}/>
      <Route path='/history' element={<Protected><History/></Protected>}/>
    </Routes>
  )
}

export default App
