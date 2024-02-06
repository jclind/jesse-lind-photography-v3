import React from 'react'
import { useAuthStateChanged } from './hooks/useAuthStateChanged'
import { LoadingScreen } from './components/LoadingScreen'
import { Routes, Route } from 'react-router-dom'
import AddImages from './pages/AddImages/AddImages'

const App = () => {
  if (!process.env.REACT_APP_FIREBASE_API_KEY)
    console.warn('MUST SET UP .env FILE WITH FIREBASE CREDENTIALS')
  const { user, loading } = useAuthStateChanged()

  if (loading) return <LoadingScreen />

  return (
    <Routes>
      <Route
        path='/'
        element={
          <div className='App'>
            <div className='div'>Welcome to the app component</div>
            <div>{user ? 'You are Logged In' : 'You are Logged Out'}</div>
          </div>
        }
      />
      <Route path='/add-images' element={<AddImages />} />
    </Routes>
  )
}

export default App
