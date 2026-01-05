    require("dotenv").config();

    const express = require("express");
    const app = express();
    const cors = require("cors");

    app.use(cors({
        origin: "http://localhost:5173",
        credentials: true,
    }))

    const dbConnect = require("./config/db.config");
    dbConnect();

    const cookieParser = require("cookie-parser");
    app.use(cookieParser());

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const taskRoute = require("./routes/task.route");
    const authRoute = require("./routes/auth.route");
    const authMiddleware = require("./middleware/auth.middleware");

    app.use("/test", (req, res)=>{
        res.send("API is working");
    })

    app.use("/api/tasks", authMiddleware, taskRoute);
    app.use("/api/auth", authRoute);

    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });