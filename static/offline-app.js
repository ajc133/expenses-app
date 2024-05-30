// create constants for the form and the form controls
const newExpenseFormEl = document.getElementsByTagName("form")[0];
const costEl = document.getElementById("cost");
const payerEl = document.getElementById("payer");
const pastExpenseContainer = document.getElementById("expenses");

const STORAGE_KEY = "expense-tracker";

// Listen to form submissions.
newExpenseFormEl.addEventListener("submit", (event) => {
  // Prevent the form from submitting to the server
  // since everything is client-side.
  event.preventDefault();

  const cost = costEl.value;
  const payer = payerEl.value;

  if (checkExpenseInvalid(cost, payer)) {
    return;
  }
  storeNewExpense(cost, payer);

  // Refresh the UI.
  renderPastExpenses();

  // Reset the form.
  newExpenseFormEl.reset();
});

function checkExpenseInvalid(cost, payer) {
  if (cost <= 0 || payer !== "AJ") {
    return true
  }
  return false
}

function storeNewExpense(cost, payer) {
  const expenses = getAllStoredExpenses();
  expenses.push({ cost, payer });
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}

function getAllStoredExpenses() {
  const data = window.localStorage.getItem(STORAGE_KEY);
  const expenses = data ? JSON.parse(data) : [];
  return expenses;
}

function renderPastExpenses() {
  const expenses = getAllStoredExpenses();
  if (expenses.length === 0) {
    return;
  }

  pastExpenseContainer.innerHTML = "";

  const pastExpenseHeader = document.createElement("h2");
  pastExpenseHeader.textContent = "Past Expenses";

  const pastExpenseList = document.createElement("h1");
  expenses.forEach((expense) => {
    const expenseEl = document.createElement("li");
    expenseEl.textContent = `${expense.payer} paid ${expense.cost}`;
    pastExpenseList.appendChild(expenseEl);
  })

  pastExpenseContainer.appendChild(pastExpenseHeader);
  pastExpenseContainer.appendChild(pastExpenseList);
}
// Start the app by rendering past expenses
renderPastExpenses();

