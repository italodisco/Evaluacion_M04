const transactions = [];

function addTransaction() {
    const descriptionInput = document.getElementById("description");
    const amountInput = document.getElementById("amount");
    const typeInput = document.getElementById("type");

    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);
    const type = typeInput.value;

    if (description.trim() === "" || isNaN(amount)) {
        alert("Por favor agregar descripción y monto válidos.");
        return;
    }

    const transaction = {
        description,
        amount,
        type
    };

    transactions.push(transaction);
    displayTransactions();
    updateTotalBudget();

    descriptionInput.value = "";
    amountInput.value = "";
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
    displayTransactions();
    updateTotalBudget();
}

function displayTransactions() {
    const transactionList = document.getElementById("transaction-list");
    transactionList.innerHTML = "";

    transactions.forEach((transaction, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${transaction.description}: $${transaction.amount} (${transaction.type})`;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", () => {
            deleteTransaction(index);
        });

        listItem.appendChild(deleteButton);
        transactionList.appendChild(listItem);
    });
}

function updateTotalBudget() {
    const totalBudget = document.getElementById("total-budget");

    const incomes = transactions
        .filter(transaction => transaction.type === "entrada")
        .reduce((total, transaction) => total + transaction.amount, 0);

    const expenses = transactions
        .filter(transaction => transaction.type === "gasto")
        .reduce((total, transaction) => total + transaction.amount, 0);

    const budget = incomes - expenses;
    totalBudget.textContent = budget.toFixed(2);
}
