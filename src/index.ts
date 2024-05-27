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
  const user = await prisma.user.findUnique({ where: { id: Number(id) } })
  res.json(user)
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
        console.log(e.message)
        res.status(409).json({ error: "User with that email already exists" })
        return
      }
    } else {
      throw e
    }
  }
})

app.get("/expenses", async (_req, res) => {
  const expenses = await prisma.expense.findMany()
  res.json({ expenses })
})

app.post("/expenses", async (req, res) => {
  // TODO: validate types of request body before attempting insert
  const { item, userId, cost } = req.body
  try {
    const expenses = await prisma.expense
      .create({
        data: {
          item,
          userId: Number(userId),
          cost: Number(cost),
        }
      })
    res.json(expenses)
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === "P2003") {
        console.log(e.message)
        res.status(400).json({ error: "Invalid userId" })
      }
    } else {
      console.log(e.code)
      throw e
    }
  }
})

app.put("/expenses/:expenseId", async (req, res) => {
  const { expenseId } = req.params
  // TODO: validate types of request body before attempting insert
  const { item, userId, cost } = req.body
  try {
    const expenses = await prisma.expense
      .update({
        where: {
          id: Number(expenseId)
        },
        data: {
          item,
          userId: Number(userId),
          cost: Number(cost),
        }
      })
    res.json(expenses)
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === "P2003") {
        console.log(e.message)
        res.status(400).json({ error: "Invalid userId" })
      }
    } else {
      console.log(e.code)
      throw e
    }
  }
})


app.get("/payments", async (_req, res) => {
  const payments = await prisma.payment.findMany()
  res.json({ payments })
})


app.post("/payments", async (req, res) => {
  // TODO: validate types of request body before attempting insert
  const { senderId, receiverId, amount } = req.body
  try {
    const expense = await prisma.payment
      .create({
        data: {
          senderId: Number(senderId),
          receiverId: Number(receiverId),
          amount: Number(amount),
        }
      })
    res.json(expense)
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === "P2003") {
        console.log(e.message)
        res.status(400).json({ error: "Invalid id..." })
      }
    } else {
      console.log(e.code)
      throw e
    }
  }
})


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
