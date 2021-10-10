import { Profile } from ".prisma/client";
import { Router } from "express";
import prisma from "../database";

const routes = Router();

routes.get("/", async (req, res) => {
  const profile: Profile[] = await prisma.profile.findMany({
    include: {
      user: true,
    },
  });

  return res.json(profile)
});

routes.post("/", async (req, res) => {
  const { bio, userId } = req.body;

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
    const profile: Profile = await prisma.profile.create({
      data: {
        bio,
        userId,
      },
    });
  
    return res.json(profile);
  } catch (error) {
    return res.json(error)
  }
});

export default routes;
