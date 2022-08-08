require('dotenv').config()
const express = require('express');
const paymentData = require('./service/createPayment')
const cors = require('cors')
const app = express();


const PORT = process.env.PORT || 3001;
app.use(cors())

app.get('/', async (req, res) => {
    try {
        const payment = await paymentData();
        res.status(200).send(payment)
    } catch (err) {
        res.status(400).send(err)
    }
})


app.listen(PORT, () => {
    console.log('listening on port:', PORT)
})