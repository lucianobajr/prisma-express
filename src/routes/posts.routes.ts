import { Category, Post } from ".prisma/client";
import { Router } from "express";
import prisma from "../database";
import { ensureAuthenticated } from "../middlewares/auth";

const routes = Router();

routes.get("/", async (req, res) => {
  const posts: Post[] = await prisma.post.findMany({
    include: {
      categories: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return res.json(posts);
});

routes.get("/:id/categories", async (req, res) => {
  const categoriesOfPost: Category[] = await prisma.post
    .findUnique({ where: { id: Number(req.params.id) } })
    .categories();

  return res.json(categoriesOfPost);
});

routes.post("/", async (req, res) => {
  const { title, authorId } = req.body;

  try {
    const post: Post = await prisma.post.create({
      data: {
        title,
        authorId,
      },
    });

    return res.json(post);
  } catch (error) {
    return res.json(error);
  }
});

routes.get("/user", ensureAuthenticated, async (req, res) => {
  const postsByUser: Post[] = await prisma.user
    .findUnique({ where: { email: "lbelo147@gmail.com" } })
    .posts();

  return res.json(postsByUser);
});

export default routes;
