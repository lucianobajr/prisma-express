import { User } from ".prisma/client";
import { Router } from "express";
import prisma from "../database";

const routes = Router();

routes.get("/", async (req, res) => {
  const users = await prisma.user.findMany();

  return res.json(users);
});

routes.post("/", async (req, res) => {
  const { email, name, country, age } = req.body;

  try {
    const user: User = await prisma.user.create({
      data: {
        email: email,
        name: name,
        country: country,
        age: age,
      },
    });

    return res.json(user);
  } catch (error) {
    return res.json(error);
  }
});
routes.delete("/", async (req, res) => {
  const { email } = req.body;

  try {
    const deletedUser: User = await prisma.user.delete({
      where: {
        email: email,
      },
    });

    return res.json(deletedUser);
  } catch (error) {
    return res.json(error);
  }
});
routes.put("/:id", async (req, res) => {
  const { email, name, country, age } = req.body;

  const updatedUser: User = await prisma.user.update({
    where: {
      id: Number(req.params.id),
    },
    data: {
      email: email,
      name: name,
      country: country,
      age: age,
    },
  });

  return res.json(updatedUser);
});

export default routes;
