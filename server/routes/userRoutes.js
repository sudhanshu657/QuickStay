import express from "express" ;
import { protect } from "../middleware/authMiddleware.js";
import { getUserData, storeRecentSearchedCities } from "../controllers/userController.js";

const userRouter = express.Router();

// both the routes will give user data
userRouter.get('/', protect, getUserData);
userRouter.post('/store-recent-search', protect, storeRecentSearchedCities);

export default userRouter;