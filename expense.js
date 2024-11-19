async function addExpense(event){
    event.preventDefault();
    const amount = document.getElementById("amount").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const expense = {amount, description, category};

    try{
        const response = await axios.post("http://localhost:3000/expense/add", expense);
        console.log("Response:", response.data);
        alert("Expense added successfully!");
        displayExpenses();
    }catch(error){
        console.error("Error:", error);
    };
};

async function displayExpenses(){
    try{
        const response = await axios.get("http://localhost:3000/expense/get");
        console.log("Response:", response.data);
        const expenses = response.data;
        const expenseList = document.getElementById("expense-list");
        expenses.forEach(expense => {
            const expenseItem = document.createElement("li");
            expenseItem.className = "list-group-item"; // Bootstrap class for styling
            expenseItem.textContent = `Amount: ${expense.amount}, Description: ${expense.description}, Category: ${expense.category}`;
            expenseList.appendChild(expenseItem);

            // delete button
            const deleteButton = document.createElement("button");
            deleteButton.className = "btn btn-danger";
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", async () => {
                try {
                    await axios.delete(`http://localhost:3000/expense/delete/${expense.id}`);
                    expenseItem.remove();
                } catch (error) {
                    console.error("Error deleting expense:", error);
                }
            });
            expenseItem.appendChild(deleteButton);
        });
    } catch (error) {
    }
};


document.addEventListener("DOMContentLoaded", () => {
    displayExpenses();
});