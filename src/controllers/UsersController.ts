import { User } from ".prisma/client";
import { Request, Response } from "express";
import prisma from "../database";

export default class UsersController {
  public async get(req: Request, res: Response) {
    const users = await prisma.user.findMany();

    return res.json(users);
  }

  public async create(req: Request, res: Response) {
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
  }

  public async delete(req: Request, res: Response) {
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
  }

  public async update(req: Request, res: Response) {
    const { id, email, name, country, age } = req.body;

    const updatedUser: User = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        email: email,
        name: name,
        country: country,
        age: age,
      },
    });

    return res.json(updatedUser);
  }
}
