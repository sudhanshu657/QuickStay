// import React from 'react'
// import Navbar from '../../components/hotelOwner/Navbar'
// import Sidebar from '../../components/hotelOwner/Sidebar'
// import { Outlet } from 'react-router-dom'

// const Layout = () => {
//   return (
//     <div className='flex flex-col h-screen'>
//         <Navbar />
//         <div className='flex flex-col h-screen'>
//             <Sidebar />
//             <div className='flex-1 p-4 pt-10 md:px-10 h-full'>
//                 <Outlet />
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Layout


import React, { useEffect } from 'react'
import Navbar from '../../components/hotelOwner/Navbar'
import Sidebar from '../../components/hotelOwner/Sidebar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext.jsx'

const Layout = () => {
  const {isOwner, navigate} = useAppContext()

  useEffect(() => {
    if(!isOwner){
      navigate('/')
    }
  },[isOwner])
  
  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      {/* Main area: sidebar + page content side-by-side */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar on the left */}
        <Sidebar />

        {/* Main content */}
        <div className="flex-1 overflow-y-auto p-4 pt-10 md:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
