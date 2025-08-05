import express from "express";
import cors from "cors";

import { port, corsOrigin } from "./config.js";
import { router } from "./routes.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: corsOrigin,
  })
);
app.use("/api", [router]);

app.listen(port, () => {
  console.log(`App's listening and ready to receive a request!`);
});
