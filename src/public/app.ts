import { Expense } from "@prisma/client"

const pastExpenseContainer = document.getElementById("expenses")

async function renderPastExpenses() {
  try {
    const response = await fetch("/expenses")
    const data = await response.json()
    pastExpenseContainer.innerHTML = ""

    const pastExpenseHeader = document.createElement("h2")
    pastExpenseHeader.textContent = "Past Expenses"

    const pastExpenseList = document.createElement("h1")
    data.expenses.forEach((expense: Expense) => {
      const expenseEl = document.createElement("li")
      expenseEl.textContent = `User ${expense.userId} paid \$${expense.cost.toFixed(2)} for ${expense.item}`
      pastExpenseList.appendChild(expenseEl)
    })

    pastExpenseContainer.appendChild(pastExpenseHeader)
    pastExpenseContainer.appendChild(pastExpenseList)
  } catch (error) {
    console.log(error)
  }
}

renderPastExpenses()
