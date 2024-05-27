import express, { Express } from "express";
import dotenv from "dotenv";
import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

dotenv.config();

export const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json())

app.get("/users", async (_req, res) => {
  const users = await prisma.user.findMany()
  res.json({ users })
})

app.get("/users/:id", async (req, res) => {
  const { id } = req.params
  const users = await prisma.user.findUnique({ where: { id: Number(id) } })
  res.json({ users })
})

app.post("/users", async (req, res) => {
  const { email, name } = req.body
  try {
    const user = await prisma.user
      .create({ data: { email, name } })
    res.json({ user })
  }
  catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === 'P2002') {
        console.log(
          `There is a unique constraint violation, a new user cannot be created with this email: ${email}`
        )
        res.status(409).json({ error: "User with that email already exists" })
        return
      }
    } else {
      throw e
    }
  }
})

app.get("/groups", async (_req, res) => {
  const groups = await prisma.group.findMany()
  res.json({ groups })
})

app.post("/groups", async (req, res) => {
  const { name } = req.body
  try {
    const group = await prisma.group
      .create({ data: { name } })
    res.json({ group })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === 'P2002') {
        console.log(
          `There is a unique constraint violation, a new group cannot be created with this name: ${name}`
        )
        res.status(409).json({ error: "Group with that name already exists" })
      }
    } else {
      throw e
    }
  }
})


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
