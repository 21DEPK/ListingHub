const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");

let newInstance = new Razorpay({
  key_id: process.env.RAZOR_PAY_ID,
  key_secret: process.env.RAZOR_PAY_SECRET,
});

router.post("/createOrder", (req, res) => {
  let options = {
    amount: +req.body.place.amount * 100, // amount in the smallest currency unit
    currency: "INR",
    receipt: "Booking Receipt",
  };
  newInstance.orders.create(options, (err, order) => {
    if (err) {
      res.status(500).json({
        success: false,
        msg: "Something went wrong",
        error: err,
      });
      return;
    }

    res.status(200).json({
      success: true,
      key_id: process.env.RAZOR_PAY_ID,
      order_id: order.id,
      created_at: new Date(Date.now()).toLocaleString(),
      statusCode: 201,
      amount: order.amount,
      amount_paid: order.amount_paid,
      amount_due: order.amount_due,
      attempts: order.attempts,
      notes: order.notes,
      currency: order.currency,
      place: req.body.place,
    });
  });
});

module.exports = router;
