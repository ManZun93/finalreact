import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductDetail from './pages/ProductDetail'
import Purchases from './pages/Purchases'
import NavBar from './components/NavBar'
import LoadingScreen from './components/LoadingScreen'
import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'


function App() {

  const isLoading = useSelector((state) => state.isLoading);

  return (
    <HashRouter>

      <NavBar />
      {isLoading && <LoadingScreen />}
      <Container className='my-5'>
        <Routes >
          <Route path='/' element={<Home />} />
          <Route path='/productdetail/:id' element={<ProductDetail />} />
          <Route path='/purchases' element={<Purchases />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Container>

    </HashRouter>
  )
}



export default App
