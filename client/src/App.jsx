
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import {AuthProvider} from "./context/AuthContext"
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import TaskPage from './pages/TaskPage'
import TaskFormPage from './pages/TaskFormPage'
import ProfilePage from './pages/ProfilePage'
import HomePage from './pages/HomePage'

import ProtectedRoute from './ProtectedRoute'
import { TaskProvider } from './context/TaskContext'
import Navbar from './components/Navbar'

function App() {
  return (
    <AuthProvider> 
      <TaskProvider>
        <BrowserRouter> 
          <main className="min-h-screen bg-zinc-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 max-w-7xl">
              <Navbar/>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route element={<ProtectedRoute />} > 
                  <Route path="/task" element={<TaskPage />} />
                  <Route path="/add-task" element={<TaskFormPage />} />
                  <Route path="/task/:id" element={<TaskFormPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                </Route>
              </Routes>
            </div>
          </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App