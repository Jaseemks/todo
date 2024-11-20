import { useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Routes'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer 
    position="top-right"
    autoClose={1500}/>
    </>
  )
}

export default App
