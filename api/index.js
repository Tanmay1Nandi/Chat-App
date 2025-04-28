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

// const verifyEmail = require("./utils/nodeMailer");
// verifyEmail();

//connecting to database
const connectToDb = require("./connection");
connectToDb(process.env.MONGO)
.then(() => console.log("Connected to database!"))
.catch((error) => console.log(error));

//Routes
const userRouter = require("./routes/auth.route");
const userChangesRouter = require("./routes/user.route")
const contactsRouter = require("./routes/contact.route");
const messageRouter = require("./routes/message.route")
const { setUpSocket } = require("./socket");

app.use("/api/auth", userRouter);
app.use("/api/user", userChangesRouter);
app.use("/api/contacts", contactsRouter);
app.use("/api/messages", messageRouter);

const server = app.listen(PORT, ()=>{
    console.log(`Server started at PORT: ${PORT}!`);
})

setUpSocket(server);

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