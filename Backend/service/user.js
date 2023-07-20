const pool = require("../config.js");
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const authUser = require('../middleware/authUser');
module.exports = {
    // getUsers: async(req, res) => {
    //     pool.query(
    //       `SELECT * FROM handi_decor.user`,
    //       (error, results, fields) => {
    //         if (error) {
    //           return res.status(500).json({ error: 'Internal server error' });
    //         }
    //         return res.status(200).json(results);
    //       }
    //     );
    //   },
    createUser: callBack=> {

      res.c
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          
          return res.status(400).json({ error: errors.array() })
      }
      const { firstName, lastName, email, phoneNumber, password } = req.body
  
      try {
          let user =  User.findOne({ $or: [{ email: email }, { phoneNumber: phoneNumber }] });
          if (user) {
              return res.status(400).send({ error: "Sorry a user already exists" })
          }
  
          // password hashing
          const salt =  bcrypt.genSalt(10)
          const secPass =  bcrypt.hash(password, salt)
  
          // create a new user
          user =  User.create({
              firstName,
              lastName,
              email,
              phoneNumber,
              password: secPass,
              isAdmin
          })
          const data = {
              user: {
                  id: user.id
              }
          }
          success = true
          const authToken = jwt.sign(data, process.env.JWT_SECRET)
          res.send({ success, authToken })
      }
      catch (error) {
          res.status(500).send("Internal server error")
      }
  },
    getUsers: callBack=> {
      pool.query(
        `SELECT firstName, lastName, phoneNumber, userEmail, address, zipCode, city, state FROM handi_decor.user`,
        [],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
      );
    }
      
}