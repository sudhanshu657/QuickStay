import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { assets, facilityIcons, roomCommonData, roomsDummyData } from '../assets/assets';
import StarRating from '../components/StarRating';

const RoomDetails = () => {
    const { id } = useParams();

    const [room, setRoom] = useState(null);
    const [mainImage, setMainImage] = useState(null);


    useEffect(() => {
      const room = roomsDummyData.find(room => room._id === id)
      room && setRoom(room)
      room && setMainImage(room.images[0])
    },[])
  return room && (
    <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
        {/* room details */}
        <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
            <h1 className='text-3xl md:text-4xl font-playfair'>{room.hotel.name} <span className='font-inter text-sm'>({room.roomType})</span></h1>
            <p className='text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full'>20% off</p>
        </div>

        {/* room rating        */}
        <div className='flex items-center gap-1 mt-2'>
            <StarRating />
            <p className='ml-2'>200+ reveiws</p>
        </div>

        {/* room addresss */}
        <div className='flex items-center gap-1 text-gray-500 mt-2'>
            <img src={assets.locationIcon} alt="location-icons" />
            <span>{room.hotel.address}</span>
        </div> 

        {/* room images */}
        <div className='flex flex-col lg:flex-row mt-6 gap-6'>
            <div className='lg:w-1/2 w-full'>
                <img src= {mainImage}  alt="room-Image" className='w-full rounded-xl shadow-lg object-cover132'/>
            </div>
            <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
                {room?.images.length >1 && room.images.map((images, index) => (
               <img onClick={() => setMainImage(images)} key={index}
               src={images} alt="Room-Image"
               className= {`w-full rounded-xl shadow-md object-cover cursor-pointer ${mainImage === images && 'outline-3 outline-orange-500'}`} />
              ) )}
            </div>
        </div>

        {/* roomhighlights */}
        <div className='flex flex-col md:flex-row md:justify-between mt-10'>
            <div className='flex flex-col'>
                <h1 className='text-3xl md:text-4xl font-playfair'>Experience Luxury Like Never Before </h1>
                <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                   {room.amenities.map((item, index) =>(
                <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100'>
                    <img src= {facilityIcons[item]} alt= {item} className='w-5 h-5' />
                    <p className='text-xs'>{item}</p>
                </div>

                ))} 
                </div>
            </div>

            {/* Room price */}
            <p className='text-2xl font-medium'>${room.pricePerNight}/night</p>

        </div>

       {/* checkin checkout form */}
     

       <form className='flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white p-6 rounded-lg shadow-[0px_0px_20px_rgba(0,0,0,0.15)]'>

  <div className='flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500 flex-wrap'>

    <div className='flex flex-col'>
      <label htmlFor="checkInDate" className='font-medium mb-1'>Check-In</label>
      <input 
        type="date" 
        id='checkInDate' 
        className='w-full rounded border border-gray-300 px-3 py-2 outline-none' 
        required 
      />
    </div>

    <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
    <div className='flex flex-col'>
      <label htmlFor="checkOutDate" className='font-medium mb-1'>Check-Out</label>
      <input 
        type="date" 
        id='checkOutDate' 
        className='w-full rounded border border-gray-300 px-3 py-2 outline-none' 
        required 
      />
    </div>

    <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
    <div className='flex flex-col'>
      <label htmlFor="guests" className='font-medium mb-1'>Guests</label>
      <input 
        type="number" 
        id='guests' 
        placeholder='0' 
        className='w-20 rounded border border-gray-300 px-3 py-2 outline-none' 
        required 
      />
    </div>

  </div>

  <button 
    type='submit' 
    className='bg-primary hover:bg-primary-dull active:scale-95 transition-all text-white rounded-md w-full md:w-auto px-6 py-3 text-base mt-4 md:mt-0'
  >
    Check Availability
  </button>

</form>


{/* common specification */}
 <div className='w-py h-0.5 bg-gray-300/70 max-md:hidden mt-10'></div>
<div className='mt-12 space-y-4'>
    {roomCommonData.map((spec, index)=> (
        <div key={index} className='flex items-start gap-2'>
            <img src= {spec.icon} alt= {`${spec.title}-icon`} className='w-6.5' />
            <div>
                <p className='text-base'>{spec.title}</p>
                <p className='text-gray-500'> {spec.description}</p>
            </div>
        </div>
    ))}

</div>

{/* hosted by */}
 <div className='w-py h-0.5 bg-gray-300/70 max-md:hidden mt-10'></div>
<div className='flex flex-col items-start gap-4 mt-15'>
    <div className='flex gap-4'>
        <img src={room.hotel.owner.image} alt="Host" className='h-14 w-14 md:h-18 md:w-18 rounded-full' />
        <div>
            <p className='text-lg md:text-xl'>Hosted by{room.hotel.name}</p>
            <div className='flex items-center mt-1'>
                <StarRating />
                <p className='ml-2'> 200+ reveiws</p>
            </div>
        </div>
        
    </div>
<button className='px-6 py-2.5 mt-4 rounded text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer'>Contact Now</button>
</div>



 




    </div>
  )
}

export default RoomDetails;