const balanceEl = document.getElementById("balance");
const incomeAmountEl = document.getElementById("income-amount");
const expenseAmountEl = document.getElementById("expense-amount");
const transactionListEl = document.getElementById("transaction-list");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");
const transactionFormEl = document.getElementById("transaction-form");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function addTransaction(e) {
  e.preventDefault();
  const description = descriptionEl.value.trim();
  const amount = parseFloat(amountEl.value);
  transactions.push({
    id: Date.now(),
    description,
    amount,
  });

  localStorage.setItem("transactions", JSON.stringify(transactions));
  updateTransactionList();
  updateSummery();
  transactionFormEl.reset();
}

function updateTransactionList() {
  transactionListEl.innerHTML = "";
  const sortedTransactions = [...transactions].reverse();
  sortedTransactions.forEach((transaction) => {
    const transactionEl = createTransacrionElement(transaction);
    transactionListEl.appendChild(transactionEl);
  });
}

function createTransacrionElement(transaction) {
  const li = document.createElement("li");
  li.classList.add("transaction");
  li.classList.add(transaction.amount > 0 ? "income" : "expense");
  li.innerHTML = `
  <span>${transaction.description}</span>
  <span>${formatCurrency(transaction.amount)}
  <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>
  </span>
  `;
  return li;
}

function updateSummery() {
  const balance = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const income = transactions
    .filter((transaction) => (transaction.amount > 0 ? transaction.amount : 0))
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const expense = transactions
    .filter((transaction) => (transaction.amount < 0 ? transaction.amount : 0))
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  balanceEl.innerText = formatCurrency(balance);
  incomeAmountEl.innerText = formatCurrency(income);
  expenseAmountEl.innerText = formatCurrency(expense);
}

function formatCurrency(number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
}

function removeTransaction(id) {
  console.log(id);
  transactions = transactions.filter((transaction) => transaction.id !== id);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  updateTransactionList();
  updateSummery();
}

updateTransactionList();
updateSummery();
transactionFormEl.addEventListener("submit", addTransaction);
