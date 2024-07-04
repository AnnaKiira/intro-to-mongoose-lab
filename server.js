require('dotenv').config()
const prompt = require('prompt-sync')();
const mongoose = require('mongoose')

const Customer = require('./models/customer.js');

const action = prompt(`
    Welcome to the CRM
    
    What would you like to do?
    
      1. Create a customer
      2. View all customers
    
    Number of action to run: 
    `)
   

    const createCustomer = async () => {
        const name = prompt('Enter customer name')
        const age = parseInt(prompt('Enter customer age'))

        const customerData = {
            name,
            age,
        } 
    
        try {
            const customer = await Customer.create(customerData);
            console.log('NEW CUSTOMER:', customer)
        } catch (error) {
            console.log(error);
        }
    }

    const index = async () => {
        try {
            const customers = await Customer.find({})
            console.log(customers)
        } catch (error) {
            console.log(error)
        }
    }
  

    const connect = async () => {
        try {
            await mongoose.connect(process.env.MONGODB_URI)
            console.log('Database connection established')
            index()
        } catch (error) {
            console.log(error)
        }
    }

    connect ()