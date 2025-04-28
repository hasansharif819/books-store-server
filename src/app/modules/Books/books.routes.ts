import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import BookControllers from "./books.controller";
import BookValidation from "./books.validation";

const router = express.Router();

router.get("/", BookControllers.getBooks);

router.get("/:id", BookControllers.getBookByID);

router.post(
  "/",
  validateRequest(BookValidation.CreateBookValidation),
  BookControllers.createBook
);

router.put(
  "/:id",
  validateRequest(BookValidation.UpdateBookValidation),
  BookControllers.updateBook
);

router.delete("/:id", BookControllers.deleteBook);

const BookRoutes = router;
export default BookRoutes;
