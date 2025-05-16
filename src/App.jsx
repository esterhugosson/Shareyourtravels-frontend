
import './App.css'
import { Route, Routes } from 'react-router-dom'


// COMPONENTS //
import { Home } from './components/Home/Home'
import { Navbar } from './components/Navbar/Navbar'
import { Register } from './components/Auth/Register'
import { Signin } from './components/Auth/Signin'
import { Youraccount } from './components/Youraccount/Youraccount' 
import { Yourtravels } from './components/Travel/Yourtravels'
import { Explore } from './components/Explore/Explore'
import { Travelform } from './components/Travel/Travelform.jsx'
import {TravelDetail} from './components/Travel/TravelDetail.jsx'

function App() {

  return (
    <>


      <Navbar/>

      <Routes>

         <Route path = '/home' element={<Home/>}/>
        <Route path = '/' element={<Home/>}/>
        <Route path="*" element={<Home />} />


         <Route path= '/signin' element={<Signin/>}/>
         <Route path= '/register' element={<Register/>}/>
         
         <Route path= '/account' element={<Youraccount/>}/>
         <Route path= '/travels' element={<Yourtravels/>}/>
        <Route path= '/explore' element={<Explore/>}/>
        <Route path= '/add' element={<Travelform/>}/>
        <Route path="/travel/:id" element={<TravelDetail />} />








      </Routes>

    
    </>

  )
}

export default App
