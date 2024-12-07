import dotenv from "dotenv";
import "dotenv/config";
import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import { logger } from "./middleware/logger";
import { notFound } from "./middleware/notFound";
import albums from "./routes/albums.routes";
import files from "./routes/files.routes";
import guilds from "./routes/guilds.routes";
import subscribedChannels from "./routes/subbedChannels.routes";

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
app.use("/api/subscribed-channels", subscribedChannels);
app.use("/api/files", files);

// Error handlers
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
