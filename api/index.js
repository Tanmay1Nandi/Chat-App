const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 8001;

//middlewares
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

//connecting to database
const connectToDb = require("./connection");
connectToDb(process.env.MONGO)
.then(() => console.log("Connected to database!"))
.catch((error) => console.log(error));

//Routes
const userRouter = require("./routes/auth.route");
const userChangesRouter = require("./routes/user.route")

app.use("/api/auth", userRouter);
app.use("/api/user", userChangesRouter);

app.listen(PORT, ()=>{
    console.log(`Server started at PORT: ${PORT}!`);
})


//Error Handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})