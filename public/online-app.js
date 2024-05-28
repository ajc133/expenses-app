const pastExpenseContainer = document.getElementById("expenses");

function renderPastExpenses() {
  const expenseQuery = new Request("/expenses");
  fetch(expenseQuery)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status ${response.status}`);
      }
      return response.json();
    })
    .then((response) => {
      pastExpenseContainer.innerHTML = "";

      const pastExpenseHeader = document.createElement("h2");
      pastExpenseHeader.textContent = "Past Expenses";

      const pastExpenseList = document.createElement("h1");
      response.expenses.forEach((expense) => {
        const expenseEl = document.createElement("li");
        expenseEl.textContent = `User ${expense.userId} paid \$${expense.cost} for ${expense.item}`;
        pastExpenseList.appendChild(expenseEl);
      })

      pastExpenseContainer.appendChild(pastExpenseHeader);
      pastExpenseContainer.appendChild(pastExpenseList);
    })
  // if (expenses.length === 0) {
  //   return;
  // }

}
renderPastExpenses();
