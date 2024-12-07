import dotenv from "dotenv";
import "dotenv/config";
import express from "express";
import { updateFSCredentials } from "./api/updateFSCredentials";
import { errorHandler } from "./middleware/errorHandler";
import { logger } from "./middleware/logger";
import { notFound } from "./middleware/notFound";
import albums from "./routes/albums.routes";
import guilds from "./routes/guilds.routes";
import media from "./routes/media.routes";
import subscribedChannels from "./routes/subbedChannels.routes";
dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
await updateFSCredentials();
// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Logger middleware
app.use(logger);
// Routes
app.use("/api/albums", albums);
app.use("/api/guilds", guilds);
app.use("/api/subscribed-channels", subscribedChannels);
app.use("/api/media", media);
// Error handlers
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => console.log(`Server running on port ${port}`));
