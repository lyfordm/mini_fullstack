import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FAQ from './pages/faq/FAQ'
import Services from './pages/services/Services'
import Navbar from './components/navigation/Navbar'
import Home from './pages/home/Home'
import CreateFAQ from './components/faq/CreateFAQ'

import './App.css'
import CreateService from './components/services/CreateService'
import EditFAQ from './components/faq/EditFAQ'
import EditService from './components/services/EditService'

function App() {
  return (
  <BrowserRouter>
  <Navbar/>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/faq' element={<FAQ/>}/>
    <Route path='/services' element={<Services/>}/>
    <Route path='/faq/create' element={<CreateFAQ/>}/>
    <Route path='/faq/edit/:id' element={<EditFAQ/>}/>
    <Route path='/services/create' element={<CreateService/>}/>
    <Route path='/services/edit/:id' element={<EditService/>}/>

  </Routes>
  </BrowserRouter>
  )
}

export default App
