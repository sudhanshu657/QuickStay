
import mongoose from "mongoose";

const userSchema= mongoose.Schema({
    _id: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    image: {type: String, default: "https://via.placeholder.com/150"},
    role: {type: String, enum: ["user" , "hotelOwner"], default: "user"},
    recentSearchedCities: [{type: String, required:false}],
}, {timestamps: true});

const user = mongoose.model("user" , userSchema);

export default user;