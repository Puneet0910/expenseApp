const Expense = require("../models/expense");

exports.addExpense = async (req, res) => {
    try {
        const {amount, description, category} = req.body;
        const expense = await Expense.create({amount, description, category});
        res.status(201).json({message: "Expense added successfully", expense});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal Server Error"});
    }
};

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.findAll();
        res.status(200).json(expenses);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal Server Error"});
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        const {id} = req.params;
        await Expense.destroy({where: {id}});
        res.status(200).json({message: "Expense deleted successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal Server Error"});
    }
};