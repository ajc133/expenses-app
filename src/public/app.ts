import { Expense, User } from "@prisma/client"

const expenseContainer = document.getElementById("expenses")
const usersContainer = document.getElementById("users")

async function getUsers(): Promise<User[]> {
  try {
    const response = await fetch("/users")
    const users: User[] = await response.json()
    return users
  }
  catch (error) {
    console.log(error)
  }
}

async function getExpenses(): Promise<Expense[]> {
  try {
    const response = await fetch("/expenses")
    const expenses: Expense[] = await response.json()
    return expenses
  }
  catch (error) {
    console.log(error)
  }
}


async function renderExpenses() {
  try {
    expenseContainer.innerHTML = ""

    const expenseHeader = document.createElement("h1")
    expenseHeader.textContent = "Past Expenses"
    const expenseList = document.createElement("ul")

    const expenses = await getExpenses()
    expenses.forEach((expense) => {
      const expenseEl = document.createElement("li")
      expenseEl.textContent = `User ${expense.userId} paid \$${expense.cost.toFixed(2)} for ${expense.item}`
      expenseList.appendChild(expenseEl)
    })

    expenseContainer.appendChild(expenseHeader)
    expenseContainer.appendChild(expenseList)
  } catch (error) {
    console.log(error)
  }
}

async function renderUsers() {
  try {
    usersContainer.innerHTML = ""

    const usersHeader = document.createElement("h1")
    usersHeader.textContent = "Users"
    const usersList = document.createElement("ul")

    const users = await getUsers()
    users.forEach((user) => {
      const userEl = document.createElement("li")
      userEl.textContent = `Username: ${user.name}\tEmail: ${user.email}`
      usersList.appendChild(userEl)
    })

    usersContainer.appendChild(usersHeader)
    usersContainer.appendChild(usersList)
  } catch (error) {
    console.log(error)
  }
}

renderExpenses()
renderUsers()
