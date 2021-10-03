import { Router } from "express";
import UsersController from "../controllers/UsersController";

const routes = Router();
const usersController = new UsersController();

routes.get("/", usersController.get);
routes.post("/", (usersController.create));
routes.delete("/", (usersController.delete));
routes.put("/", (usersController.update));

export default routes;
