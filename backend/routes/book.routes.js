import express from "express";
import { addBookController, addReviewController, deleteBook, getAllBooks, getBookById, updateBookDetail, viewReviewController } from "../controllers/book.controller.js";
import { isVerified } from "../middleware/authenticateUser.js";

const bookRouter = express.Router();

bookRouter.post('/',isVerified, addBookController);
bookRouter.get('/',isVerified, getAllBooks);
bookRouter.get('/:id',isVerified, getBookById);
bookRouter.put('/:id',isVerified, updateBookDetail);
bookRouter.delete('/:id',isVerified, deleteBook)

//review routes inside books
bookRouter.post('/:id/reviews',isVerified, addReviewController);
bookRouter.get('/:id/reviews',isVerified, viewReviewController);

export default bookRouter;