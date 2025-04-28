import express from "express";
import BookRoutes from "../modules/Books/books.routes";
import AuthorRoutes from "../modules/Author/author.routes";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/books",
    route: BookRoutes,
  },
  {
    path: "/authors",
    route: AuthorRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
