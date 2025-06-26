// import Booking from "../models/Booking.js"
// import Hotel from "../models/Hotel.js";
// import Room from "../models/Room.js";



// // funtion to check availability of room
//  const checkAvailability = async({ checkInDate, checkOutDate, room}) => {
//     try {
//         const bookings =await Booking.find({
//           room,
//           checkInDate: {$lte: checkOutDate},
//           checkOutDate: {$gte: checkInDate},
//         });
//         const isAvailable = bookings.length === 0;
//         return isAvailable;
//     } catch (error) {
//         console.error(error.message);
//     }
//  }

//  // api to check availability of room
//  //post/ api/booking/check-availability

//  export const checkAvailabilityAPI = async(requestAnimationFrame,res) =>{
//     try {
//        const { room, checkInDate, checkOutDate} = req.body;
//        const isAvailable = await checkAvailability({checkInDate, checkOutDate,room});
//        res.json({ success: true, isAvailable}) 
//     } catch (error) {
//         res.json({success: true, message: error.message})
//     }
//  }

//  // Api to create a new booking 
//  // POST /api/booking/book

//  export const createBooking = async (req,res) => {
//     try {
//          const { room, checkInDate, checkOutDate} = req.body;
//          const user= req.user._id;

//          //before booking check availibility
//          const isAvailable =await checkAvailability({
//          checkInDate,
//          checkOutDate,
//          room
//         });

//         if(!isAvailable){
//             return res.json({success: false, message: "Room is not available"})
//         }
//         // get totalprice from room
//         const roomData =await Room.findById(room).populate("hotel");
//         let totalPrice= roomData.pricePerNight;

//         //calculate totalprice based on nights
//         const checkIn = new Date(checkInDate);
//         const checkOut = new Date(checkOutDate);
//         const timeDiff =checkOut.getTime()- checkIn.getTime();
//         const nights = Math.ceil(timeDiff / (1000*3600*24));
        
//         totalPrice *=nights;
 
//         const booking = await Booking.create ({
//             user,
//             room,
//             hotel: roomData.hotel._id,
//             guests: +guests,
//             checkInDate,
//             checkOutDate,
//             totalPrice,
//         })

//         res.json({ success: true, message: "Booking created successfully"})
         
        
//     } catch (error) {
//         console.log(error);
//          res.json({ success: false, message: "Booking  not created successfully"})
//     }
//  };

//  // api to get all booking for a user 
//  // Get/ api/ booking/user
//  export const getUserBookings = async (req, res) => {
//     try {
//         const user= req.user._id;
//         const bookings = await Booking.find({user}).populate("room hotel").sort({createdAt: -1})
//         res.json({success: true, bookings})
//     } catch (error){
//         res.json({success: false, message: "Failed to fetch bookings" });
//     }
//  }


//  export const getHotelBookings = async (req,res) => {
//   try {
      
//       const hotel = await Hotel.findOne({owner: req_auth.userId});
//     if(!hotel){
//         return res.json({ success:false, message: "No hotel found"});
//     }
//     const bookings = await Booking.find({hotel: hotel._id}).populate("room hotel user").sort({ createdAt: -1});
//      //total booking 
//      const totalBookings= bookings.length;
//     // total revenue 
//     const totalRevenue = bookings.reduce((acc, booking)=> acc + booking.totalPrice, 0)

//     res.json({success: true, dashboardData: {totalBookings, totalRevenue,bookings}})

//   } catch (error) {
//     res.json({success: false, message: "Failed to fetch bookings"})
//   }
//  }



import transporter from "../configs/nodemailer.js";
import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

// Helper function to check room availability
const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
  try {
    const bookings = await Booking.find({
      room,
      checkInDate: { $lte: checkOutDate },
      checkOutDate: { $gte: checkInDate },
    });

    return bookings.length === 0;
  } catch (error) {
    console.error("Availability check error:", error.message);
    return false;
  }
};

// ✅ API to check availability of room
// POST /api/bookings/check-availability
export const checkAvailabilityAPI = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate } = req.body;

    // ISO format check
    const isValidDate = (d) => /^\d{4}-\d{2}-\d{2}$/.test(d);
    if (!isValidDate(checkInDate) || !isValidDate(checkOutDate)) {
      return res.json({ success: false, message: "Invalid date format. Use YYYY-MM-DD." });
    }

    const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room });
    return res.json({ success: true, isAvailable });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// ✅ API to create a new booking
// POST /api/bookings/book
// export const createBooking = async (req, res) => {
//   try {
//     const { room, checkInDate, checkOutDate, guests = 1 } = req.body;
//     const user = req.user._id;

//     // Check room availability
//     const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room });
//     if (!isAvailable) {
//       return res.json({ success: false, message: "Room is not available" });
//     }

//     const roomData = await Room.findById(room).populate("hotel");
//     let totalPrice = roomData.pricePerNight;

//     const checkIn = new Date(checkInDate);
//     const checkOut = new Date(checkOutDate);
//     const nights = Math.ceil((checkOut - checkIn) / (1000 * 3600 * 24));

//     totalPrice *= nights;

//     await Booking.create({
//       user,
//       room,
//       hotel: roomData.hotel._id,
//       guests: +guests,
//       checkInDate,
//       checkOutDate,
//       totalPrice,
//     });

//     res.json({ success: true, message: "Booking created successfully" });
//   } catch (error) {
//     console.log("Booking creation error:", error);
//     res.json({ success: false, message: "Booking not created successfully" });
//   }
// };


// changes the code right now for updations 

// export const createBooking = async (req, res) => {
//   try {
//     const { userId } = req.auth();
//     if (!userId) return res.status(401).json({ success: false, message: "User not authenticated" });

//     const { room, checkInDate, checkOutDate, guests = 1 } = req.body;

//     const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room });
//     if (!isAvailable) {
//       return res.json({ success: false, message: "Room is not available" });
//     }

//     const roomData = await Room.findById(room).populate("hotel");

//     let totalPrice = roomData.pricePerNight;
//     const checkIn = new Date(checkInDate);
//     const checkOut = new Date(checkOutDate);
//     const nights = Math.ceil((checkOut - checkIn) / (1000 * 3600 * 24));
//     totalPrice *= nights;

//     await Booking.create({
//       user: userId,
//       room,
//       hotel: roomData.hotel._id,
//       guests: +guests,
//       checkInDate,
//       checkOutDate,
//       totalPrice,
//     });
   
//     // sending email
//     const mailOptions ={
//       from: process.env.SENDER_MAIL,
//       to: req.user.email,
//       subject: 'Hotel Booking Details',
//       html: `
//          <h2> your Booking Detail</h2>
//          <p>Dear ${req.user.username},</p>
//          <p>Thank you for your booking! Here is Your Deatails:</p>
//          <ul>
//             <li><strong>Booking ID:</strong> ${booking._id}</li>
//             <li><strong>Hotel name:</strong> ${roomData.hotel.name}</li>
//             <li><strong>Location:</strong> ${roomData.hotel.address}</li>
//             <li><strong>Date:</strong> ${booking.checkInDate.toDateString()}</li>
//             <li><strong>Booking Amount</strong> ${process.env.CURRENCY || '$'}${booking.totalPrice} / night</li>
//          </ul>   
//            <p> look forward to welcoming you!</p>
//            <p>if you need to make any changes, feel free to contact us.. </p> 
      
//       `

//     }

//     await transporter.sendMail(mailOptions)



//     res.json({ success: true, message: "Booking created successfully" });

//   } catch (error) {
//     console.log("Booking creation error:", error);
//     res.json({ success: false, message: "Booking not created successfully" });
//   }
// };


export const createBooking = async (req, res) => {
  try {
    // ✅ Clerk puts auth data here
    const { userId } = req.auth;
    if (!userId) {
      return res.status(401).json({ success: false, message: "User not authenticated" });
    }

    // ✅ Use req.user set by protect middleware
    const user = req.user;

    const { room, checkInDate, checkOutDate, guests = 1 } = req.body;

    const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room });
    if (!isAvailable) {
      return res.json({ success: false, message: "Room is not available" });
    }

    const roomData = await Room.findById(room).populate("hotel");

    let totalPrice = roomData.pricePerNight;
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 3600 * 24));
    totalPrice *= nights;

    // ✅ Store the booking to use in email
    const booking = await Booking.create({
      user: userId,
      room,
      hotel: roomData.hotel._id,
      guests: +guests,
      checkInDate,
      checkOutDate,
      totalPrice,
    });

    // ✅ Email setup
    const mailOptions = {
      from: process.env.SENDER_MAIL,
      to: user.email, // <--- Comes from protect middleware
      subject: 'Hotel Booking Details',
      html: `
        <h2>Your Booking Details</h2>
        <p>Dear ${user.username},</p>
        <p>Thank you for your booking! Here are your details:</p>
        <ul>
          <li><strong>Booking ID:</strong> ${booking._id}</li>
          <li><strong>Hotel name:</strong> ${roomData.hotel.name}</li>
          <li><strong>Location:</strong> ${roomData.hotel.address}</li>
          <li><strong>Check-In:</strong> ${new Date(booking.checkInDate).toDateString()}</li>
          <li><strong>Check-Out:</strong> ${new Date(booking.checkOutDate).toDateString()}</li>
          <li><strong>Booking Amount:</strong> ${process.env.CURRENCY || '$'}${booking.totalPrice}</li>
        </ul>
        <p>We look forward to welcoming you!</p>
        <p>If you need to make any changes, feel free to contact us.</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Booking created and email sent successfully" });
  } catch (error) {
    console.error("Booking creation error:", error);
    res.json({ success: false, message: "Booking not created or email failed" });
  }
};



// ✅ Get all bookings for a user
// GET /api/bookings/user
export const getUserBookings = async (req, res) => {
  try {
    const user = req.user._id;
    const bookings = await Booking.find({ user }).populate("room hotel").sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
     
    res.json({ success: false, message: "Failed to fetch bookings" });
  }
};

// ✅ Get all bookings for hotel owner
// GET /api/bookings/hotel
export const getHotelBookings = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ owner: req.auth.userId });
    if (!hotel) {
      return res.json({ success: false, message: "No hotel found" });
    }

    const bookings = await Booking.find({ hotel: hotel._id })
      .populate("room hotel user")
      .sort({ createdAt: -1 });

    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);

    res.json({ success: true, dashboardData: { totalBookings, totalRevenue, bookings } });
  } catch (error) {
    res.json({ success: false, message: "Failed to fetch bookings" });
  }
};
