
// import user from "../models/User.js";

// //middleware to check if user is authenticated
// export const protect = async(req,res, next) =>{
//     const { userId } = await req.auth;
//     if(!userId){
//         res.json({success: false, message: "not authenticated"})
//     } else{
//         const User = await user.findById(userId);
//         req.user = user;
//         next();
//     }
// }


import user from "../models/User.js";

//middleware to check if user is authenticated
export const protect = async (req, res, next) => {
    const { userId } = await req.auth;
    if (!userId) {
        res.json({ success: false, message: "not authenticated" });
    } else {
        const User = await user.findById(userId);
        req.user = User; // ✅ Fix here
        next();
    }
};


