require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const app = express();
const port = process.env.PORT;
const host = "localhost";

const cors = require("cors");

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsOptions));

const userRoutes = require("./routes/userRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

const expense = require("./models/expense");

mongoose
  .connect(`${process.env.DATABASE_CONNECTION_STRING}personal_budget_app`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(port, host, () => {
      console.log(`Server is running at port ${port}`);
    });
  })
  .catch((err) => console.log(err.message));

app.use(
  session({
    secret: process.env.MONGO_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongoUrl: `${process.env.DATABASE_CONNECTION_STRING}personal_budget_app`,
    }),
    cookie: { maxAge: 60 * 60 * 1000 },
  })
);

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/budget", budgetRoutes);
app.use("/api/v1/expense", expenseRoutes);
