import express from "express";
import { addBookController, deleteBook, getAllBooks, getBookById, updateBookDetail } from "../controllers/book.controller.js";
import { isVerified } from "../middleware/authenticateUser.js";

const bookRouter = express.Router();

bookRouter.post('/', addBookController);
bookRouter.get('/', getAllBooks);
bookRouter.get('/:id', getBookById);
bookRouter.put('/:id', updateBookDetail);
bookRouter.delete('/:id', deleteBook)


export default bookRouter;