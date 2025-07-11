import express from "express";
import cors from "cors";
import "dotenv/config";

import { router } from "./routes.js";

const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use("/api", [router]);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
