import { Category, Post } from ".prisma/client";
import { Router } from "express";
import prisma from "../database";

const routes = Router();

routes.get("/", async (req, res) => {
  const categories: Category[] = await prisma.category.findMany();

  return res.json(categories);
});

routes.post("/", async (req, res) => {
  const { name, posts } = req.body;

  const category: Category = await prisma.category.create({
    data: {
      name,
      posts: {
        connect: posts,
      },
    },
  });

  return res.json(category);
});

export default routes;
