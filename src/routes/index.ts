import { Router } from "express";
import users from "./users.routes";
import posts from "./posts.routes";
import categories from "./categories.routes";
import profiles from "./profiles.routes";

const routes = Router();

routes.get("/", (req, res) => {
  return res.json({ ok: true });
});

routes.get("/terms", (req, res) => {
  return res.json({ terms: true });
});

routes.use("/users", users);
routes.use("/posts", posts);
routes.use("/categories", categories);
routes.use("/profiles", profiles);

export default routes;
