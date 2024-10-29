import "dotenv/config";
import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import { logger } from "./middleware/logger";
import { notFound } from "./middleware/notFound";

const port = process.env.PORT || 5000;
const app = express();

app.use(logger);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
