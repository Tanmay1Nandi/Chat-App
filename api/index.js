const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 8001;
// const NODE_ENV = process.env.NODE_ENV || "development"

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
const messageRouter = require("./routes/message.route");
const filesRouter = require("./routes/files.route");
const channelRouter = require("./routes/channel.route")
const { setUpSocket } = require("./socket");



app.use("/uploads/files", express.static("uploads/files"));


app.use("/api/auth", userRouter);
app.use("/api/user", userChangesRouter);
app.use("/api/contacts", contactsRouter);
app.use("/api/messages", messageRouter);
app.use("/api/files", filesRouter);
app.use("/api/channels", channelRouter);

// if (NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "..", "client", "dist")));
  
    app.get(/^\/(?!api).*/, (req, res) => {
      res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
    });
  // }

  
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