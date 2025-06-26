import Hotel from "../models/Hotel.js";
import user from "../models/User.js";

export const registerHotel = async(req, res) => {
    try {
        const {name, address, contact, city} = req.body;
        // const owner = req.user._id;
        const owner = req.auth.userId;


        //check if useer already registerd
        const hotel = await Hotel.findOne({owner})
        if(hotel){
            return res.json({ success: false, message: "Hotel Already Register"})
        }
        await Hotel.create({name,address,contact,city,owner});

        await user.findByIdAndUpdate(owner, { role: "hotelOwner" });


        res.json({success: true, message:"Hotel register successfully"})

    } catch (error) {
      res.json({success: false, message: error.message})
    }
}