document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const descriptionInput = document.getElementById("description");
  const amountInput = document.getElementById("amount");
  const expenseListDisplay = document.getElementById("expense-list");
  const totalExpenseDisplay = document.getElementById("total-expense");

  // Load expenses from localStorage or initialize as an empty array
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  // Function to calculate and update the total expense
  function updateTotal() {
    const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    totalExpenseDisplay.textContent = `${total.toFixed(2)}`; // The "Total: $" prefix is in CSS
  }

  // Function to render the list of expenses
  function renderExpenses() {
    expenseListDisplay.innerHTML = ""; // Clear existing list items

    if (expenses.length === 0) {
      const noExpensesMessage = document.createElement("li");
      noExpensesMessage.textContent = "No expenses added yet. Add some!";
      noExpensesMessage.style.textAlign = "center";
      // These lines are not needed for horizontal centering and padding, as 'auto' is not a valid padding value.
      // noExpensesMessage.style.paddingLeft = "auto";
      // noExpensesMessage.style.paddingRight = "auto";
      noExpensesMessage.style.marginLeft = "auto";
      noExpensesMessage.style.marginRight = "auto";
      noExpensesMessage.style.width = "fit-content"; // Or a specific width like "200px"

      noExpensesMessage.style.color = "#8892b0"; // A softer color for the message
      // Adjust the padding to increase left and right space
      noExpensesMessage.style.padding = "10px 20px"; // Example: 10px top/bottom, 20px left/right
      // You can adjust '20px' to whatever value looks best for you.

      expenseListDisplay.appendChild(noExpensesMessage);
      return;
    }

    expenses.forEach((expense) => {
      const listItem = document.createElement("li");

      // Create span for description
      const descriptionSpan = document.createElement("span");
      descriptionSpan.classList.add("description");
      descriptionSpan.textContent = expense.description;

      // Create span for amount
      const amountSpan = document.createElement("span");
      amountSpan.classList.add("amount");
      amountSpan.textContent = `$${expense.amount.toFixed(2)}`;

      // Create delete button
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete-btn");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        deleteExpense(expense.id);
      });

      // Structure the list item content
      const contentDiv = document.createElement("div"); // For description and amount
      contentDiv.style.display = "flex";
      contentDiv.style.flexGrow = "1";
      contentDiv.style.justifyContent = "space-between";
      contentDiv.style.alignItems = "center";
      contentDiv.appendChild(descriptionSpan);
      contentDiv.appendChild(amountSpan);

      listItem.appendChild(contentDiv);
      listItem.appendChild(deleteButton);
      expenseListDisplay.appendChild(listItem);
    });
  }

  // Function to add a new expense
  function addExpense(description, amount) {
    if (description === "" || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid description and a positive amount.");
      return;
    }

    const newExpense = {
      id: Date.now(), // Unique ID based on timestamp
      description: description,
      amount: parseFloat(amount),
    };

    expenses.push(newExpense);
    saveExpenses();
    renderExpenses();
    updateTotal();
  }

  // Function to delete an expense
  function deleteExpense(id) {
    expenses = expenses.filter((expense) => expense.id !== id);
    saveExpenses();
    renderExpenses();
    updateTotal();
  }

  // Function to save expenses to localStorage
  function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  // Event listener for form submission
  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const description = descriptionInput.value.trim();
    const amount = amountInput.value.trim();

    addExpense(description, amount);

    // Clear input fields after submission
    descriptionInput.value = "";
    amountInput.value = "";
    descriptionInput.focus(); // Set focus back to description
  });

  // Initial render and total calculation on page load
  renderExpenses();
  updateTotal();
});
