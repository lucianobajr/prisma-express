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
routes.delete("/:id", async (req, res) => {

  const userId = Number(req.params.id);

  const userExists = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!userExists) {
    return res.status(400).json({
      error: "user not exists!",
    });
  }

  try {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return res.status(200).send();
  } catch (error) {
    return res.json(error);
  }
});
routes.put("/:id", async (req, res) => {
  const { name, country, age } = req.body;

  const updatedUser: User = await prisma.user.update({
    where: {
      id: Number(req.params.id),
    },
    data: {
      name: name,
      country: country,
      age: age,
    },
  });

  return res.json(updatedUser);
});

export default routes;
