import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer';
import Allroom from './pages/Allroom';
import RoomDetails from './pages/RoomDetails';
import MyBooking from './pages/MyBooking';
import HostelReg from './components/HostelReg';
import Layout from './pages/hotelOwner/Layout';
import Dashboard from './pages/hotelOwner/Dashboard';
import AddRoom from './pages/hotelOwner/AddRoom';
import ListRoom from './pages/hotelOwner/ListRoom';
const App = () => {

const isOwnerPath = useLocation().pathname.includes("owner"); // hide thee navigation bar whn owner page opens

  return (
    <div>
    {!isOwnerPath && <Navbar />}
    { false && <HostelReg />}
    <div className='min-h-[70vh]'>
      <Routes>
        <Route path= '/' element={ <Home />} />
        <Route path= '/rooms' element={ <Allroom />} />
         <Route path= '/rooms/:id' element={ <RoomDetails />} />
          <Route path= '/my-bookings' element={ <MyBooking />} />
          <Route path='/owner' element= {<Layout />}>

           <Route index element={<Dashboard />} />
           <Route path="add-room" element={<AddRoom />} />
           <Route path= "list-room" element={ <ListRoom />} />

          </Route>
      </Routes>
    </div>
    <Footer />
    </div>
  )
}

export default App 