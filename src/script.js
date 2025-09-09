const balanceEl = document.getElementById("balance");
const incomeAmountEl = document.getElementById("income-amount");
const expenseAmountEl = document.getElementById("expense-amount");
const transactionListEl = document.getElementById("transaction-list");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");
const transactionFormEl = document.getElementById("transaction-form");

const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

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
  <span>${transaction.amount}
  <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  </span>
  `;
  return li;
}

transactionFormEl.addEventListener("submit", addTransaction);
