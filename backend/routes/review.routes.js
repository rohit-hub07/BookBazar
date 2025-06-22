import express from "express";
import { deleteReviewController } from "../controllers/review.controller.js";


const reviewRouter = express.Router();

reviewRouter.delete('/:id', deleteReviewController);

export default reviewRouter;
