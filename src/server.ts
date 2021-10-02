import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import routes from "./routes";

const app = express();

app.use(cors());
app.use(routes);

async function main() {
  await prisma.user.create({
    data: {
      id: "user-1",
      name: "Luciano",
      email: "lbelo147@gmail.com",

      groups: {
        connectOrCreate: {
          where: {
            id: "group-1",
          },
          create: {
            id: "group-1",
            title: "Grupo 01",
          },
        },
      },
    },
  });
}

main();

app.listen(3333, () => {
  console.log("Back-end started on port 3333! 🔥️");
});
