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


async function renderExpenses(expenses: Expense[], users: User[]) {
  try {
    expenseContainer.innerHTML = ""

    const expenseHeader = document.createElement("h1")
    expenseHeader.textContent = "Past Expenses"
    const expenseList = document.createElement("ul")

    expenses.forEach((expense) => {
      const expenseEl = document.createElement("li")
      const expensePayer = users.find((user) => user.id === expense.userId)
      expenseEl.textContent = `${expensePayer.name}(${expensePayer.id}) paid \$${expense.cost.toFixed(2)} for ${expense.item}`
      expenseList.appendChild(expenseEl)
    })

    expenseContainer.appendChild(expenseHeader)
    expenseContainer.appendChild(expenseList)
  } catch (error) {
    console.log(error)
  }
}

async function renderUsers(users: User[]) {
  try {
    usersContainer.innerHTML = ""

    const usersHeader = document.createElement("h1")
    usersHeader.textContent = "Users"
    const usersList = document.createElement("ul")

    users.forEach((user) => {
      const userEl = document.createElement("li")
      userEl.textContent = `Username: ${user.name}(${user.id})`
      usersList.appendChild(userEl)
    })

    usersContainer.appendChild(usersHeader)
    usersContainer.appendChild(usersList)
  } catch (error) {
    console.log(error)
  }
}

async function main() {
  const usersList = await getUsers()
  const expensesList = await getExpenses()
  renderExpenses(expensesList, usersList)
  renderUsers(usersList)

}

main()
