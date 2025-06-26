// import React, { useMemo, useState } from 'react'
// import { assets, facilityIcons } from '../assets/assets'
// import { useSearchParams } from 'react-router-dom'
// import StarRating from '../components/StarRating';
// import { useAppContext } from '../context/AppContext';

// const CheckBox = ({ label, selected = false, onchange = () => {} }) => {

//   return (
//     <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
//       <input type= "checkBox" checked= {selected} onChange= {(e) => onchange(e.target.checked, label)} />
//       <span className='font-light select-none'>{label}</span>
//     </label>
//   )
// }


// const RadioButton = ({label, selected = false, onchange = () => {} }) => {
//   return (
//     <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
//       <input type= "radio"  name= "sortOption" checked= {selected} onChange= {() => onchange( label)} />
//       <span className='font-light select-none'>{label}</span>
//     </label>
//   )
// }

// const Allroom = () => {

//   const [searchParams, setSearchParams] = useSearchParams()
//   const {rooms, navigate, currency} = useAppContext();
//     // const navigate = useNavigate();

//     const [openFilters, setopenFilters] = useState(false);
//     const [selectedFilters, setSelectedFilters] = useState({
//       roomTypes: [],
//       priceRange: [],
//     });
    
//     const [selectedSort, setSelectedSort] = useState('')

//     const roomTypes = [
//       "single",
//       "Double Bed",
//       "Luxury Room",
//       "Family Suite",

//     ];
//     const priceRanges = [
//       '0 to 500',
//       '500 to 1000',
//       '1000 to 2000',
//       '2000 to 3000',
//     ];
//     const sortOptions = [
//       "price Low to High",
//       "price High to Low",
//       "Newest First"
//     ];
    
//     //Handle changes for filters and sorting
//     const handleFilterChange = (checked, value, type) => {
//       setSelectedFilters((prevFilters) =>{
//         const updatedFilters ={...prevFilters};
//         if(checked){
//           updatedFilters[type].push(value);
//         }else{
//           updatedFilters[type] = updatedFilters[type].filter(item => item !== value);
//         }
//         return updatedFilters;
//       })
//     }
 
//     const handleSortChange = (sortOption) =>{
//       setSelectedSort(sortOption);
//     }

//     // function to check if a room matches the selected room types
//     const matchesRoomType = (room) =>{
//      return selectedFilters.roomTypes.length === 0 || selectedFilters.roomTypes.includes(room.roomType);

//     }
     
//     // function  to check if a room matches the selected price ranges
//     const matchesPriceRange =(room) =>{
//       return selectedFilters.priceRange.length === 0 || selectedFilters.priceRange.some(range => {
//         const [min, max] = range.split(' to ').map(Number);
//         return room.pricePerNight >= min && room.pricePerNight <= max;
//       })
//     }
//     //function to sort rooms based on the slected sort option 
//     const sortRooms = (a,b) =>{
//       if(selectedSort === 'price Low to High'){
//         return a.pricePerNight - b.pricePerNight;
//       }
//       if(selectedSort === 'price High to Low'){
//         return b.pricePerNight - a.pricePerNight;
//       }
//       if(selectedSort === 'Newest First'){
//         return new Date(b.createdAt) - new Date(a.createdAt)
//       }
//       return 0;
//     }
    
//      // filter destination 
//      const filterDestination = (room) =>{
//       const destination = searchParams.get('destination');
//       if(!destination) return true;
//       return room.hotel.city.toLowerCase().includes(destination.toLowerCase())
//      }

//      // filter and sort rooms based on the selected filters and sort option
//      const filteredRooms = useMemo(() =>{
//       return rooms.filter(room => matchesRoomType(room) && matchesPriceRange(room)
//     && filterDestination(room)).sort(sortRooms);
//      },[rooms, selectedFilters, selectedSort,searchParams])

//     //  clear all filters 
//      const clearFilters =() => {
//         setSelectedFilters({
//            roomTypes: [],
//            priceRange: [],

//         });
//         setSelectedSort('');
//         setSearchParams({});
//      }

//   return (
//     <div className='flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32'>
//      <div>
//         <div className='flex flex-col items-start text-left'>
//             <h1 className='font-playfair text-4xl md:text-[40px]'>Hotel Rooms</h1>
//             <p className='text-sm md:text-base text-graay-500/90 mt-2 max-w-174'>Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.</p>
//         </div>
//             {/* dummy datat of rooms */}

//          {filteredRooms.map((room)=>(
//             <div  key= {room._id} className='flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:border-0'>
//                 <img onClick={() => {navigate(`/rooms/${room._id}`); scrollTo(0,0)}}
//                 src={room.images[0]} alt="hotel-img"  title='veiw Room Details' className='max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer'/>
//                 <div className='md:w-1/2 flex flex-col gap-2'>
//                     <p className='text-gray-500'>{room.hotel.city}</p>
//                     <p onClick={() => {navigate(`/rooms/${room._id}`); scrollTo(0,0)}}
//                     className='text-gray-800 text-3xl font-playfair cursor-pointer'>{room.hotel.name}</p>
//                     <div className='flex items-center'>
//                       <StarRating />
//                       <p className='ml-2'>200+ reveiws</p>
//                     </div>

//                     <div className='flex items-center gap-1 text-gray-500 mt-2 text-sm'>
//                         <img src={assets.locationIcon} alt="locationIcon" />
//                         <span>{room.hotel.address}</span>

//                     </div>
                     
//                      <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'> 
//                       {/* Room ameenities */}
//                       {room.amenities.map((item,index) => (
//                         <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70'>
//                           <img src= {facilityIcons[item]} alt= {item} className='w-5 h-5' />
//                           <p className='text-xs'>{item}</p>
//                         </div>
//                       ))}
//                      </div>
//                      {/* room price per night */}
//                      <p className='text-xl font-medium text-gray-700'>${room.pricePerNight} /night</p>

//                 </div>
//             </div>


//          ))}

//      </div>


//        {/* {filter} */}
//        <div className='bg-white w-80 border border-gray-300 text-gray-600 max-lg:mb-8 min-lg:mt-16'>
       
//        {/* <div className='flex items-center justify-between px-5 py-2.5 min-lg:border-b border-gray-300 ${openFilters && "'> */}
//        <div className={`flex items-center justify-between px-5 py-2.5 min-lg:border-b border-gray-300`}>
//         <p className='text-base font-medium text-gray-800'>FILTER</p>
//         <div className='text-xs cursor-pointer'>
//           <span className='lg:hidden' onClick={() => setopenFilters(!openFilters)}>
//              {openFilters ? 'HIDE' : 'SHOW'} </span>
//           <span className='hidden lg:block'>CLEAR</span>
//         </div>
//        </div>
//       <div className={ `${openFilters ? 'h-auto' : "h-0 lg:h-auto"} overflow-hidden transition-all duration-700`} >

//              <div className='px-5 pt-5'>
//                 <p className='font-medium text-gray-800 pb-2'>popular filter</p>
//                 {roomTypes.map((room, index) => (
//                   <CheckBox key={index} label={room} selected={selectedFilters.roomTypes.includes(room)} onchange={(checked)=> handleFilterChange(checked, room, 'roomType')} />
//                 ))}
//             </div>
//              <div className='px-5 pt-5'>
//                 <p className='font-medium text-gray-800 pb-2'>price Range</p>
//                 {priceRanges.map((range, index) => (
//                   <CheckBox key={index} label={`$${currency} ${range}`} selected={selectedFilters.priceRange.includes(range)} onchange={(checked)=> handleFilterChange(checked, range, 'priceRange')}  />
//                 ))}
//             </div>
//             <div className='px-5 pt-5 pb-7'>
//                 <p className='font-medium text-gray-800 pb-2'>Sort By</p>
//                 {sortOptions.map((option, index) => (
//                  <RadioButton key={index} label={option} selected= {selectedSort === option} onchange={() => handleSortChange(option)} />
//                 ))}
//             </div>
//       </div>

//        </div>

//     </div>
//   )
// }

// export default Allroom



// new code 

import React, { useMemo, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { assets, facilityIcons } from '../assets/assets';
import StarRating from '../components/StarRating';
import { useAppContext } from '../context/AppContext';

// Reusable checkbox component
const CheckBox = ({ label, selected = false, onchange = () => {} }) => (
  <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
    <input
      type="checkbox"
      checked={selected}
      onChange={(e) => onchange(e.target.checked, label)}
    />
    <span className="font-light select-none">{label}</span>
  </label>
);

// Reusable radio button component
const RadioButton = ({ label, selected = false, onchange = () => {} }) => (
  <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
    <input
      type="radio"
      name="sortOption"
      checked={selected}
      onChange={() => onchange(label)}
    />
    <span className="font-light select-none">{label}</span>
  </label>
);

const Allroom = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { rooms = [], currency = '$' } = useAppContext();

  const [openFilters, setOpenFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    roomTypes: [],
    priceRange: [],
  });
  const [selectedSort, setSelectedSort] = useState('');

  const roomTypes = ['single', 'Double Bed', 'Luxury Room', 'Family Suite'];
  const priceRanges = ['0 to 500', '500 to 1000', '1000 to 2000', '2000 to 3000'];
  const sortOptions = ['price Low to High', 'price High to Low', 'Newest First'];

  const handleFilterChange = (checked, value, type) => {
    setSelectedFilters((prev) => {
      const updated = { ...prev };
      if (checked) {
        updated[type].push(value);
      } else {
        updated[type] = updated[type].filter((item) => item !== value);
      }
      return updated;
    });
  };

  const handleSortChange = (sortOption) => {
    setSelectedSort(sortOption);
  };

  const matchesRoomType = (room) =>
    selectedFilters.roomTypes.length === 0 ||
    selectedFilters.roomTypes.includes(room.roomType);

  const matchesPriceRange = (room) =>
    selectedFilters.priceRange.length === 0 ||
    selectedFilters.priceRange.some((range) => {
      const [min, max] = range.split(' to ').map(Number);
      return room.pricePerNight >= min && room.pricePerNight <= max;
    });

  const filterDestination = (room) => {
    const destination = searchParams.get('destination');
    if (!destination) return true;
    return room?.hotel?.city?.toLowerCase().includes(destination.toLowerCase());
  };

  const sortRooms = (a, b) => {
    if (selectedSort === 'price Low to High') return a.pricePerNight - b.pricePerNight;
    if (selectedSort === 'price High to Low') return b.pricePerNight - a.pricePerNight;
    if (selectedSort === 'Newest First')
      return new Date(b.createdAt) - new Date(a.createdAt);
    return 0;
  };

  const filteredRooms = useMemo(() => {
    return rooms
      .filter((room) => matchesRoomType(room) && matchesPriceRange(room) && filterDestination(room))
      .sort(sortRooms);
  }, [rooms, selectedFilters, selectedSort, searchParams]);

  const clearFilters = () => {
    setSelectedFilters({ roomTypes: [], priceRange: [] });
    setSelectedSort('');
    setSearchParams({});
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32">
      {/* Rooms section */}
      <div>
        <div className="flex flex-col items-start text-left">
          <h1 className="font-playfair text-4xl md:text-[40px]">Hotel Rooms</h1>
          <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-174">
            Take advantage of our limited-time offers and special packages to enhance your stay
            and create unforgettable memories.
          </p>
        </div>

        {filteredRooms.map((room) => (
          <div
            key={room._id}
            className="flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:border-0"
          >
            <img
              onClick={() => {
                navigate(`/rooms/${room._id}`);
                window.scrollTo(0, 0);
              }}
              src={room?.images?.[0]}
              alt="hotel-img"
              title="View Room Details"
              className="max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer"
            />

            <div className="md:w-1/2 flex flex-col gap-2">
              <p className="text-gray-500">{room?.hotel?.city}</p>
              <p
                onClick={() => {
                  navigate(`/rooms/${room._id}`);
                  window.scrollTo(0, 0);
                }}
                className="text-gray-800 text-3xl font-playfair cursor-pointer"
              >
                {room?.hotel?.name}
              </p>

              <div className="flex items-center">
                <StarRating />
                <p className="ml-2">200+ reviews</p>
              </div>

              <div className="flex items-center gap-1 text-gray-500 mt-2 text-sm">
                <img src={assets.locationIcon} alt="locationIcon" />
                <span>{room?.hotel?.address}</span>
              </div>

              <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
                {room.amenities.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70"
                  >
                    {facilityIcons[item] && (
                      <img src={facilityIcons[item]} alt={item} className="w-5 h-5" />
                    )}
                    <p className="text-xs">{item}</p>
                  </div>
                ))}
              </div>

              <p className="text-xl font-medium text-gray-700">
                {currency} {room.pricePerNight} /night
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters section */}
      <div className="bg-white w-80 border border-gray-300 text-gray-600 max-lg:mb-8 min-lg:mt-16">
        <div className="flex items-center justify-between px-5 py-2.5 min-lg:border-b border-gray-300">
          <p className="text-base font-medium text-gray-800">FILTER</p>
          <div className="text-xs cursor-pointer">
            <span className="lg:hidden" onClick={() => setOpenFilters(!openFilters)}>
              {openFilters ? 'HIDE' : 'SHOW'}
            </span>
            <span className="hidden lg:block" onClick={clearFilters}>
              CLEAR
            </span>
          </div>
        </div>

        <div
          className={`${
            openFilters ? 'h-auto' : 'h-0 lg:h-auto'
          } overflow-hidden transition-all duration-700`}
        >
          {/* Room Types */}
          <div className="px-5 pt-5">
            <p className="font-medium text-gray-800 pb-2">Popular Filter</p>
            {roomTypes.map((type, index) => (
              <CheckBox
                key={index}
                label={type}
                selected={selectedFilters.roomTypes.includes(type)}
                onchange={(checked) => handleFilterChange(checked, type, 'roomTypes')}
              />
            ))}
          </div>

          {/* Price Ranges */}
          <div className="px-5 pt-5">
            <p className="font-medium text-gray-800 pb-2">Price Range</p>
            {priceRanges.map((range, index) => (
              <CheckBox
                key={index}
                label={`$${range}`}
                selected={selectedFilters.priceRange.includes(range)}
                onchange={(checked) => handleFilterChange(checked, range, 'priceRange')}
              />
            ))}
          </div>

          {/* Sort Options */}
          <div className="px-5 pt-5 pb-7">
            <p className="font-medium text-gray-800 pb-2">Sort By</p>
            {sortOptions.map((option, index) => (
              <RadioButton
                key={index}
                label={option}
                selected={selectedSort === option}
                onchange={handleSortChange}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Allroom;
