import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import userRouter from "./src/routes/userRoute.js";
import documentRouter from "./src/routes/documentRoute.js";
import reportRouter from "./src/routes/reportRoute.js";
import historyRouter from "./src/routes/historyRoute.js";

connectDB();

app.use("/api/user", userRouter);
app.use("/api/document", documentRouter);
app.use("/api/report", reportRouter);
app.use("/api/history", historyRouter);


app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.status || 400).json({
        success: false,
        message: err.message || "Something went wrong",
    });
});

const PORT = process.env.PORT || 5000;

app.listen( PORT, ()=>{
  console.log(`Server running on port ${PORT}`);
})
