const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../config.js');
const authUser = require('../middleware/authUser');
const router = express.Router();
const pool = require("../config.js");
const {
    
    getUsers
  } = require("../controller/user.js");
  const userService = require("../controller/user.js");
router.post("/createUser",[
  body('firstName', 'Enter a valid name').isLength({ min: 3 }),
  body('lastName', 'Enter a valid name').isLength({ min: 3 }),
  body('userEmail', 'Enter a valid email').isEmail(),
  body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
  body('phoneNumber', 'Enter a valid phone number').isLength({ min: 10, max: 10 })
],async(req,res)=>{

  res.c
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      
      return res.status(400).json({ error: errors.array() })
  }
  const { firstName, lastName, userEmail, phoneNumber, password,address, zipCode, city, state  } = req.body
  let sql = 'SELECT * FROM handi_decor.user WHERE userEmail = ? OR phoneNumber = ?';
    let values = [userEmail, phoneNumber];
    pool.query(sql, values, async (err, results) => {
      if (err) {
        console.error('Error querying users:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (results.length > 0) {
        return res.status(400).json({ error: 'Sorry, a user already exists' });
      }
      
      // Password hashing
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Insert a new user
      sql = 'INSERT INTO handi_decor.user (firstName, lastName, userEmail, phoneNumber, userPassword,address,zipCode,city,state ) VALUES (?, ?, ?, ?, ?, ?,?,?,?)';
      values = [firstName, lastName, userEmail, phoneNumber, hashedPassword, address,zipCode,city,state];
      pool.query(sql, values, (err, result) => {
        if (err) {
          console.error('Error creating user:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        const data = { user: { id: result.insertId } };
        const authToken = jwt.sign(data, "process.env.JWT_SECRET");
        return res.json({ authToken });
      });
    });
  } 
)
router.post('/login', [

  body('userEmail', 'Enter a valid email').isEmail(),
  body('userPassword', 'Password cannot be blank').exists(),

], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { userEmail, userPassword } = req.body;
  const sql = 'SELECT * FROM handi_decor.user WHERE userEmail = ? ';
  pool.query(sql, [userEmail], async (err, results) => {
    if (err) {
      console.error('Error querying user:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    
    if (results.length === 0) {
      return res.status(400).send({ error: 'User not found' });
    }

    const user = results[0];
    const passComp = await bcrypt.compare(userPassword, user.userPassword);
    if (!passComp) {
      return res.status(400).send({ error: 'Please try to login with correct credentials' });
    }

    const data = {
      user: {
        userEmail: user.userEmail
      }
    };

    const authToken = jwt.sign(data, "process.env.JWT_SECRET");
    res.send({ success: true, authToken });
  });
});

router.put('/updateuser', authUser, async (req, res) => {
  const { userDetails } = req.body;
  const convertData = JSON.parse(userDetails);

  const updateUserQuery = 'UPDATE user SET firstName = ?, lastName = ?, userEmail = ?, phoneNumber = ?, address = ?, zipCode = ?, city = ?, state = ? WHERE userEmail = ?';
  const values = [
    convertData.firstName,
    convertData.lastName,
    convertData.userEmail,
    convertData.phoneNumber,
    convertData.address,
    convertData.zipCode,
    convertData.city,
    convertData.state,
    req.user.userEmail
  ];

  pool.query(updateUserQuery, values, (err, results) => {
    if (err) {
      console.error('Error updating user:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.affectedRows === 0) {
      return res.status(400).send('User Not Found');
    }

    res.status(200).send({ success: true });
  });
})
// router.get('/getuser',  async (req, res) => {

//     try {
       
//         res.status(200).json({msg:"happy"})
//         console.log("hello");


//     } catch (error) {
//         res.status(400).send("Something went wrong")
//     }
// }
// )

  module.exports = router;