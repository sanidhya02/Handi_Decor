const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const port = process.env.PORT ||8080; // Choose your desired port number
// Middleware for parsing request bodies
const userRoutes = require('./routes/auth');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json());


app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    if(req.method === 'OPTIONS'){
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
        return res.status(200).json({});
    }
    next();
});
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});

// const userRoutes = require('./routes/auth');
// app.use('/users', userRoutes);

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
module.exports = app;