import express, { Express, Response } from "express";
import dotenv from "dotenv";
import { Prisma, PrismaClient } from "@prisma/client"
import path from "path"

const prisma = new PrismaClient()

dotenv.config();

export const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // parses application/x-www-form-urlencoded
app.use(express.static("./static"))
app.use(express.static("./dist/public"))

app.get("/users", async (_req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
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
    res.json(user)
  }
  catch (e) {
    handleError(res, e)
  }
})

app.put("/users/:id", async (req, res) => {
  const { id } = req.params
  // TODO: validate types of request body before attempting insert
  const { name, email } = req.body
  try {
    const user = await prisma.user
      .update({
        where: {
          id: Number(id)
        },
        data: {
          name,
          email,
        }
      })
    res.json(user)
  } catch (e) {
    handleError(res, e)
  }
})

// TODO: figure out cascading delete!
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params
  try {
    await prisma.user
      .delete({
        where: {
          id: Number(id)
        }
      })
    res.json()
  } catch (e) {
    handleError(res, e)
  }
})

app.get("/expenses", async (_req, res) => {
  const expenses = await prisma.expense.findMany()
  res.json(expenses)
})

app.get("/expenses/:id", async (req, res) => {
  const { id } = req.params
  const expense = await prisma.user.findUnique({ where: { id: Number(id) } })
  res.json(expense)
})


app.post("/expenses", async (req, res) => {
  // TODO: validate types of request body before attempting insert
  const { item, userId, cost } = req.body
  try {
    const expense = await prisma.expense
      .create({
        data: {
          item,
          userId: Number(userId),
          cost: Number(cost),
        }
      })
    res.format({
      html: function() {
        // res.send(`<p>Expense added</p>\n<p>${expense.item}</p>`)
        res.redirect("/")
      },
      json: function() {
        res.json(expense)
      },
      default: function() {
        res.status(406).send("Not acceptable")
      }
    })
  } catch (e) {
    handleError(res, e)
  }
})

app.put("/expenses/:id", async (req, res) => {
  const { id } = req.params
  // TODO: validate types of request body before attempting insert
  const { item, userId, cost } = req.body
  try {
    const expenses = await prisma.expense
      .update({
        where: {
          id: Number(id)
        },
        data: {
          item,
          userId: Number(userId),
          cost: Number(cost),
        }
      })
    res.json(expenses)
  } catch (e) {
    handleError(res, e)
  }
})

app.delete("/expenses/:id", async (req, res) => {
  const { id } = req.params
  try {
    await prisma.expense
      .delete({
        where: {
          id: Number(id)
        }
      })
    res.json()
  } catch (e) {
    handleError(res, e)
  }
})


app.get("/payments", async (_req, res) => {
  const payments = await prisma.payment.findMany()
  res.json(payments)
})

app.get("/payments/:id", async (req, res) => {
  const { id } = req.params
  const payment = await prisma.payment.findUnique({ where: { id: Number(id) } })
  res.json(payment)
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
    handleError(res, e)
  }
})

app.put("/payments/:id", async (req, res) => {
  const { id } = req.params
  // TODO: validate types of request body before attempting insert
  const { senderId, receiverId, amount } = req.body
  try {
    const expenses = await prisma.payment
      .update({
        where: {
          id: Number(id)
        },
        data: {
          senderId: Number(senderId),
          receiverId: Number(receiverId),
          amount: Number(amount),
        }
      })
    res.json(expenses)
  } catch (e) {
    handleError(res, e)
  }
})

app.delete("/payments/:id", async (req, res) => {
  const { id } = req.params
  // TODO: validate types of request body before attempting insert
  try {
    await prisma.payment
      .delete({
        where: {
          id: Number(id)
        },
      })
    res.json()
  } catch (e) {
    handleError(res, e)
  }
})

function handleError(res: Response, e: any) {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    handlePrismaError(res, e)
  } else {
    throw e
  }
}

function handlePrismaError(res: Response, e: Prisma.PrismaClientKnownRequestError) {
  console.log(JSON.stringify({ error: e }))
  switch (e.code) {
    case "P2002":
      res.status(409).json({ error: "ID is not unique" })
      break;
    case "P2003":
      res.status(400).json({ error: "Foreign key constraint failure" })
      break
    case "P2025":
      res.status(400).json({ error: "Record does not exist" })
      break
    default:
      res.status(400).json({ error: "Something went wrong" })
      break
  }

}

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
