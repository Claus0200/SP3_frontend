import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import MainLayout from './layouts/MainLayout.jsx'
import Vision from './pages/Vision.jsx'
import Endpoints from './pages/Endpoints.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'

const router = createBrowserRouter(
  
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />}/>
      <Route path="vision" element={<Vision />} />
      <Route path="endpoints" element={<Endpoints />} />
      
      <Route path="books" element={<BookList />}>
       <Route path=":searchType" element={<BookList />} />
      </Route>
      <Route path="book-order" element={<BookOrder />} />

      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup/>} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

