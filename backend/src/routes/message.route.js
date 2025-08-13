import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";
import { updateProfile } from "../controllers/auth.controller.js";
const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);

router.put("/update-profile", protectRoute, updateProfile);
router.post("/send/:id", protectRoute, sendMessage);

export default router;
