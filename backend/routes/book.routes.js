import express from "express";
import { addBookController, addReviewController, deleteBook, getAllBooks, getBookById, updateBookDetail, viewReviewController } from "../controllers/book.controller.js";
import { isVerified } from "../middleware/authenticateUser.js";
import { isAdmin } from "../middleware/getCurrUser.js";

const bookRouter = express.Router();

bookRouter.post('/',isVerified,isAdmin, addBookController);
bookRouter.get('/',isVerified, getAllBooks);
bookRouter.get('/:id',isVerified, getBookById);
bookRouter.put('/:id',isVerified,isAdmin, updateBookDetail);
bookRouter.delete('/:id',isVerified,isAdmin, deleteBook)

//review routes inside books
bookRouter.post('/:id/reviews',isVerified, addReviewController);
bookRouter.get('/:id/reviews',isVerified, viewReviewController);

export default bookRouter;