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

  const profile: Profile = await prisma.profile.create({
    data: {
      bio,
      userId,
    },
  });

  return res.json(profile);
});

export default routes;
