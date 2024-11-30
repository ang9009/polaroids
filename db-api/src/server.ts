import dotenv from "dotenv";
import "dotenv/config";
import express from "express";
import { updateFSSessionId } from "./api/updateFSSessionId";
import { errorHandler } from "./middleware/errorHandler";
import { logger } from "./middleware/logger";
import { notFound } from "./middleware/notFound";
import albums from "./routes/albums";
import guilds from "./routes/guilds";
import subscribedChannels from "./routes/subbedChannels";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();
await updateFSSessionId();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger middleware
app.use(logger);

// Routes
app.use("/api/albums", albums);
app.use("/api/guilds", guilds);
app.use("/api/subscribed-channels", subscribedChannels);

// Error handlers
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
