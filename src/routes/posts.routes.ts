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

routes.get("/user/:id", ensureAuthenticated, async (req, res) => {
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

  const postsByUser: Post[] = await prisma.user
    .findUnique({ where: { id: userId } })
    .posts();

  return res.json(postsByUser);
});

routes.get("/published", async (req, res) => {
  const publishedPosts = await prisma.post.findMany({
    where: {
      published: true,
    },
  });

  return res.json(publishedPosts);
});

routes.post("/", async (req, res) => {
  const { title, authorId } = req.body;

  const userExists = await prisma.user.findUnique({
    where: {
      id: authorId,
    },
  });

  if (!userExists) {
    return res.status(400).json({
      error: "user not exists!",
    });
  }

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

routes.put("/:id", ensureAuthenticated, async (req, res) => {
  const postId = Number(req.params.id);
  const { title } = req.body;

  const postExists = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!postExists) {
    return res.status(400).json({
      error: "post not exists!",
    });
  }

  try {
    const postUpdated = await prisma.post.update({
      data: {
        title: title,
      },
      where: {
        id: postId,
      },
    });

    return res.status(200).json(postUpdated);
  } catch (error) {
    return res.json(error);
  }
});

routes.put("/publish/:id", ensureAuthenticated, async (req, res) => {
  const postId = Number(req.params.id);

  const postExists = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!postExists) {
    return res.status(400).json({
      error: "post not exists!",
    });
  }

  try {
    const postUpdated = await prisma.post.update({
      data: {
        published: true,
      },
      where: {
        id: postId,
      },
    });

    return res.status(200).json(postUpdated);
  } catch (error) {
    return res.json(error);
  }
});

routes.delete("/:id", ensureAuthenticated, async (req, res) => {
  const postId = Number(req.params.id);

  const postExists = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!postExists) {
    return res.status(400).json({
      error: "post not exists!",
    });
  }

  try {
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return res.status(200).send();
  } catch (error) {
    return res.json(error);
  }
});

export default routes;
