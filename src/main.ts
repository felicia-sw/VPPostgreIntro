import express from "express";
import { PORT } from "./utils/env-util";
import { publicRouter } from "./routes/public-api";
// import { errorMiddleware } from "./middlewares/error-middleware";
// import { privateRouter } from "./routes/private-api";

const app = express();

app.use(express.json()); // Allows us to read JSON bodies

// Register the routes
app.use(publicRouter);

// Register Error Middleware (Optional, but recommended if you have the file)
// app.use(errorMiddleware);

app.listen(PORT || 3000, () => {
    console.log(`Connected to port ${PORT || 3000}`);
});