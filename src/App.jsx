
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
import { TravelDetail } from './components/Travel/TravelDetail.jsx'
import { TravelEdit } from './components/Travel/TravelEdit.jsx'
import { TravelDelete } from './components/Travel/TravelDelete'
import { AddPlace } from './components/Travel/AddPlace.jsx'
import { EditPlace } from './components/Travel/EditPlace.jsx'

function App() {

  return (
    <>


      <Navbar />

      <Routes>

        <Route path='/home' element={<Home />} />
        <Route path='/' element={<Home />} />
        <Route path="*" element={<Home />} />


        <Route path='/signin' element={<Signin />} />
        <Route path='/register' element={<Register />} />

        <Route path='/account' element={<Youraccount />} />
        <Route path='/travels' element={<Yourtravels />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/add' element={<Travelform />} />
        <Route path="/travel/:id" element={<TravelDetail />} />

        <Route path="/travel/:id" element={<TravelDetail />}>
          <Route path="edit" element={<TravelEdit />} />
          <Route path="delete" element={<TravelDelete />} />
          <Route path="add-place" element={<AddPlace />} />
          <Route path="edit-place/:placeId" element={<EditPlace />} />
        </Route>










      </Routes>


    </>

  )
}

export default App
