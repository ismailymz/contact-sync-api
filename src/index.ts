import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import contactRoutes from "./routes/contactRoutes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "contact-sync-api",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/contacts", contactRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, error: "Bu endpoint mevcut değil" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`contact-sync-api çalışıyor → http://localhost:${PORT}`);
  console.log(`Sağlık kontrolü → http://localhost:${PORT}/health`);
});