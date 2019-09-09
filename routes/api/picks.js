const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

// const User = require('../../models/User');
const Pick = require('../../models/Pick');
// const Contest = require('../../models/Contest');

router.post(
  '/',
  [
    auth,
    [
      check('price', 'Please enter a valid posible price.')
        .isFloat({ min: 0 })
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { price, contest } = req.body;
      let pick = await Pick.findOne({ user: req.user.id, contest });
      if (pick) {
        pick.price = price;
        await pick.save();
        return res.json(pick);
      }
      const newPick = new Pick({
        contest,
        price,
        user: req.user.id
      });

      pick = await newPick.save();
      res.json(newPick);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
