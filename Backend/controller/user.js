const {
   
    getUsers,   
  } = require("../service/user.js");

  module.exports={
    getUsers: (req, res) => {
        getUsers((err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log(`hemlo${results}`);
          return res.json({
            success: 1,
            data: results
          });
      
        });
      }
  }