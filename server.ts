import { createServer } from "http";
import app from "./src/config/app";
import connectDB from "./src/config/db";

let PORT: string = process.env.PORT || "5001";

const httpServer = createServer(app);

connectDB();

httpServer.listen(PORT, () =>
  console.log(`Server Listening on port http://localhost:${PORT}`)
);
