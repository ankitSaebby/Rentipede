import express from "express";

import {
    getUsers,
    getUserPosts,
    addRemovePost,
    deletePost
} from "../controllers/users.js";

import { verifiedUser } from "../middleware/auth.js";

const router = express.Router();
/* READ */
router.get("/:id", verifiedUser, getUsers);
router.get("/:id/posts", verifiedUser, getUserPosts);

/* TODO: to be deleted  */
/* Update */
router.patch("/:id/:postId", verifiedUser, addRemovePost);

/* Delete */
router.delete("/:id/:postId", verifiedUser, deletePost);

export default router