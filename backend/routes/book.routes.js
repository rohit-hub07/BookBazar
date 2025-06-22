import express from "express";
import { addBookController, addReviewController, deleteBook, getAllBooks, getBookById, updateBookDetail, viewReviewController } from "../controllers/book.controller.js";
import { isVerified } from "../middleware/authenticateUser.js";

const bookRouter = express.Router();

bookRouter.post('/', addBookController);
bookRouter.get('/', getAllBooks);
bookRouter.get('/:id', getBookById);
bookRouter.put('/:id', updateBookDetail);
bookRouter.delete('/:id', deleteBook)

//review routes inside books
bookRouter.post('/:id/reviews', addReviewController);
bookRouter.get('/:id/reviews', viewReviewController);

export default bookRouter;