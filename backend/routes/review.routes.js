import express from "express";
import { deleteReviewController } from "../controllers/review.controller.js";
import { isVerified } from "../middleware/authenticateUser.js";


const reviewRouter = express.Router();

reviewRouter.delete('/:id',isVerified, deleteReviewController);

export default reviewRouter;
