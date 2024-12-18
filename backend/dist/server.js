import dotenv from "dotenv";
import "dotenv/config";
import express, { Router } from "express";
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
const apiRouter = Router();
apiRouter.use("/albums", albums);
apiRouter.use("/guilds", guilds);
apiRouter.use("/subscribed-channels", subscribedChannels);
apiRouter.use("/files", files);
app.use("/api", apiRouter);
// Error handlers
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => console.log(`Server running on port ${port}`));
