const connectToMongo = require("./db");
connectToMongo();
const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());//this helps us view and get json requests send to the db in our function body.

//Available routes prepare
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.get("/", (req, res) => {
  res.send("Response by express");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
