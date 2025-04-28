import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import authorController from "./author.controller";

const router = express.Router();

router.post("/", authorController.createAuthor);

router.get("/", authorController.getAllAuthors);

router.get("/:id", authorController.getAuthorByID);

router.put("/:id", authorController.updateAuthor);

router.delete("/:id", authorController.deleteAuthor);

const AuthorRoutes = router;
export default AuthorRoutes;
