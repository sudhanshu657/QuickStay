
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


import User from "../models/User.js";

//middleware to check if user is authenticated
export const protect = async (req, res, next) => {
    try {
        const auth = req.auth();
        const { userId } = auth;
        
        if (!userId) {
            return res.json({ success: false, message: "User not authenticated" });
        }

        let user = await User.findById(userId);
        
        // If user doesn't exist in DB, create them from Clerk data
        if (!user) {
            try {
                const userData = {
                    _id: userId,
                    email: auth.user?.emailAddresses?.[0]?.emailAddress || "no-email@example.com",
                    username: ((auth.user?.firstName || "User") + " " + (auth.user?.lastName || "")).trim(),
                    image: auth.user?.imageUrl || "https://via.placeholder.com/150",
                    role: "user",
                    recentSearchedCities: []
                };
                
                user = await User.create(userData);
                console.log("Auto-created user in DB:", userId);
            } catch (createError) {
                console.error("Failed to auto-create user:", createError.message);
                return res.json({ success: false, message: "Failed to create user profile" });
            }
        }
        
        req.user = user;
        next();
    } catch (error) {
        console.error("Auth middleware error:", error);
        return res.json({ success: false, message: "Authentication error" });
    }
};


