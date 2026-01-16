// import Hotel from "../models/Hotel.js";
// import { v2 as cloudinary } from "cloudinary";
// import Room from "../models/Room.js";
// // import path from "path";
// // import { populate } from "dotenv";


// // API to create a new room for a hotel
// export const createRoom = async (req, res) => {
// try{
//     const {roomType, pricePerNight, amenities} =req.body;
//     const hotel = await Hotel.findOne({owner: req.auth.userId})

//     if(!hotel) return res.json({ suceess: false, message: "No Hotel found"});

//     //upload images to cloudinary
//     const uploadImages = req.files.map(async (file) => {
//        const response=  await cloudinary.uploader.upload(file.path);
//        return response.secure_url;
//     })
//     // wait for all uploads to complete 
//     const images = await promise.all(uploadImages)

//     await Room.create({
//         hotel: hotel._id,
//         roomType,
//         pricePerNight: +pricePerNight,
//         amenities: JSON.parse(amenities),
//         images,
//     })
//     res.json({suceess: true, message: "Room created successfully"})



// } catch(error) {
//       res.json({suceess:false, message: error.message})
// }
// }

// // API to get all room
// export const getRooms = async (req, res) => {
//     try {
//         const rooms = await Room.find({isAvailable: true}).populate({
//             path: 'hotel',
            
//                 populate:{
//                     path: 'owner',
//                     select: 'image'
                
//             }
//         }).sort({createdAt: -1})
//         res.json({success: true, rooms});
//     } catch (error) {
//            res.json({success: false, message: error.message});
//     }

// }
// // API to get all room for a specific hotel
// export const getOwnerRooms = async (req, res) => {
//     try {
//         const hotelData = await Hotel({owner: req.auth.userId})
//         const rooms = await Room.find({hotel: hotelData._id.toString()}).populate("hotel");
//         res.json({success: true, rooms});
//     } catch (error) {
//          res.json({success: false, message: error.message});
//     }

// }

// // API to to toogle avaibility of a room
// export const toggleRoomAvailability= async (req, res) => {
//        try {
//         const { roomId } = req.body;
//         const roomData = await Room.findById(roomId);
//         roomData.isAvailable = !roomData.isAvailable;
//         await roomData.save();
//         res.json({ success: true, message: "Room availability updated"});
//        } catch (error) {
//          res.json({success: false, message: error.message});
//        }
// }


import Hotel from "../models/Hotel.js";
import { v2 as cloudinary } from "cloudinary";
import Room from "../models/Room.js";

// API to create a new room for a hotel
export const createRoom = async (req, res) => {
    try {
        const { roomType, pricePerNight, amenities } = req.body;
        const { userId } = req.auth();
        const hotel = await Hotel.findOne({ owner: userId });

        if (!hotel) return res.json({ success: false, message: "No Hotel found" });

        // upload images to cloudinary
        const uploadImages = req.files.map(async (file) => {
            const response = await cloudinary.uploader.upload(file.path);
            return response.secure_url;
        });

        // wait for all uploads to complete - Fixed: Promise.all instead of promise.all
        const images = await Promise.all(uploadImages);

        await Room.create({
            hotel: hotel._id,
            roomType,
            pricePerNight: +pricePerNight,
            amenities: JSON.parse(amenities),
            images,
        });

        // Fixed: success instead of suceess
        res.json({ success: true, message: "Room created successfully" });

    } catch (error) {
        // Fixed: success instead of suceess
        res.json({ success: false, message: error.message });
    }
};

// API to get all room
export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find({ isAvailable: true }).populate({
            path: 'hotel',
            populate: {
                path: 'owner',
                select: 'image'
            }
        }).sort({ createdAt: -1 });
        
        res.json({ success: true, rooms });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// API to get all room for a specific hotel
export const getOwnerRooms = async (req, res) => {
    try {
        const { userId } = req.auth();
        const hotelData = await Hotel.findOne({ owner: userId });
        
        if (!hotelData) {
            return res.json({ success: false, message: "No hotel found for this owner" });
        }
        
        const rooms = await Room.find({ hotel: hotelData._id.toString() }).populate("hotel");
        res.json({ success: true, rooms });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// API to toggle availability of a room
export const toggleRoomAvailability = async (req, res) => {
    try {
        const { roomId } = req.body;
        const roomData = await Room.findById(roomId);
        
        if (!roomData) {
            return res.json({ success: false, message: "Room not found" });
        }
        
        roomData.isAvailable = !roomData.isAvailable;
        await roomData.save();
        res.json({ success: true, message: "Room availability updated" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};