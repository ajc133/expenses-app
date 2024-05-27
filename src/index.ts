import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express!");
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

app.get("/users/:id", async (req, res) => {
  const { id } = req.params
  const users = await prisma.user.findUnique({ where: { id: parseInt(id) } })
  res.json(users)
})


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
