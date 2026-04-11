import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import AppRouter from './router/AppRouter'
import { ToastContainer, Bounce } from 'react-toastify'
import axios from 'axios'
//import './App.css'

function App() {
  const [count, setCount] = useState(0)
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001"
  const token = localStorage.getItem("token")
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common.Authorization
  }

  return (
    <>
      <AppRouter></AppRouter>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  )
}

export default App
