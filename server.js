const express = require("express");
const app = express();
const connectDB = require("./config/db");

app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send({ msg: "Welcome man" }));

app.use('/signup', require('./routes/signup'));
app.use('/auth', require('./routes/auth'));
app.use('/posts', require('./routes/posts'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server has started on ${PORT}`));
connectDB();
