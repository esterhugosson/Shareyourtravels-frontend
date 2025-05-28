
import './App.css'
import { Route, Routes } from 'react-router-dom'

//Messages
import { ToastContainer, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// COMPONENTS //
import { Home } from './components/Home/Home'
import { Navbar } from './components/Navbar/Navbar'
import { Register } from './components/Auth/Register'
import { Signin } from './components/Auth/Signin'
import { Youraccount } from './components/Youraccount/Youraccount'
import { Yourtravels } from './components/Travel/Yourtravel/Yourtravels.jsx'
import { Explore } from './components/Explore/Explore'
import { Travelform } from './components/Travel/Travelform/Travelform.jsx'
import { TravelDetail } from './components/Travel/SpecTravel/TravelDetail.jsx'
import { TravelEdit } from './components/Travel/TravelEdit.jsx'
import { TravelDelete } from './components/Travel/TravelDelete'
import { AddPlace } from './components/Travel/AddPlace.jsx'
import { EditPlace } from './components/Travel/EditPlace.jsx'
import {AccountForm} from './components/Youraccount/updateAccount.jsx'

//Not found site
import { NotFound }from './components/404/404NotFound.jsx'

function App() {

  return (
    <>


      <Navbar />

      <Routes>

        <Route path='/home' element={<Home />} />
        <Route path='/' element={<Home />} />

        {/* fallback route */}
        <Route path="*" element={<NotFound />} />


        <Route path='/signin' element={<Signin />} />
        <Route path='/register' element={<Register />} />

        <Route path='/account' element={<Youraccount />} />
        <Route path='/edit' element={<AccountForm />} />
        <Route path='/travels' element={<Yourtravels />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/add' element={<Travelform />} />

        <Route path="/travel/:id" element={<TravelDetail />}>
          <Route path="edit" element={<TravelEdit />} />
          <Route path="delete" element={<TravelDelete />} />
          <Route path="add-place" element={<AddPlace />} />
          <Route path="edit-place/:placeId" element={<EditPlace />} />
        </Route>

      </Routes>

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
        theme="light"
        transition={Bounce}
      />


    </>

  )
}

export default App
