import dotenv from "dotenv";
import "dotenv/config";
import express from "express";
import albums from "./features/albumManagement/routes/albums";
import guilds from "./features/guildTracking/routes/guilds";
import { errorHandler } from "./middleware/errorHandler";
import { logger } from "./middleware/logger";
import { notFound } from "./middleware/notFound";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger middleware
app.use(logger);

// Routes
app.use("/api/albums", albums);
app.use("/api/guilds", guilds);

// Error handlers
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
