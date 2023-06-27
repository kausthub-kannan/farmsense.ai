import { useState } from 'react'
import './App.css'
import{BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Auth from './pages/Auth/Auth'
import Navbar from './components/NavBar/Navbar'
import Dashborad from './pages/Dashboard/Dashborad'
import EggMainPart from './pages/Incubation/Incubation'
import FeedMainPart from './pages/Yield/Yield'
import Detection from './pages/Detection/Detection'
function App() {

  return (
    <div className="App">
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/' element={<Auth title="SignIn"/>}/>
        <Route path='/signup' element={<Auth title="SignUp"/>}/>
        <Route path='/chicken' element={<Detection type="Poultry"/>}/>
        <Route path='/plant' element={<Detection type="Plant"/>}/>
        <Route path='/egg' element={<EggMainPart/>}/>
        <Route path='/feed' element={<FeedMainPart/>}/>
        <Route path='/dashboard' element={<Dashborad/>}/>
      </Routes>
    </Router>
    </div>
  )
}

export default App
