const express = require("express");
const app = express();
const connectDB = require("./config/db");

app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send({ msg: "Welcome man" }));

app.use('/api/signup', require('./routes/signup'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/profile', require('./routes/profile'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server has started on ${PORT}`));
connectDB();
