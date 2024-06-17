 // setting up backend payment API using Firebase function and thunder clint//
// Firebase project configuration
 
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config()
const stripe = require('stripe')(
  process.env.STRIPE_KEY
)
const app = express()

app.use(cors({ origin: true }));
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Success!' });
});

// Stripe payment gateway

app.post("/payment/create", async(req,res)=>{
  const total =req.query.total;
  if (total > 0){
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  })
  
  //payment clientSecret//
  res.status(201).json({
    clientSecret:paymentIntent.client_secret,
  })
  }else{
    res.status(403).json({message: "total must be greater than 0",
    });
  }
});

app.listen(5000, (err)=>{
  if(err) throw err
  console.log("Amazon Server is Running on PORT: 5000, Http://localhost:5000")
})

 
 