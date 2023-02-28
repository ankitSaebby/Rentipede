import express from "express";

import {
    getUsers,
    getUserPosts,
    addRemovePost
} from "../controllers/users.js";

import { verifiedUser } from "../middleware/auth.js";

const router = express.Router();
/* READ */
router.get("/:id", verifiedUser, getUsers);
router.get("/:id/posts", verifiedUser, getUserPosts);

/* Update */
router.patch("/:id/:postId", verifiedUser, addRemovePost);

export default router