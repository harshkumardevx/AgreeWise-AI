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

// NOTE: files are now stored on Cloudinary (see src/utils/cloudinaryUpload.js),
// not on local disk, so the old `/uploads` static route is no longer needed.

// Global error handler — without this, errors thrown by multer
// (wrong file type, file too large) or anything else bubble up to
// Express's default handler, which returns an HTML page instead of
// JSON. The frontend always reads `error.response.data.message`,
// so every error needs to come back as JSON with that shape.
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
