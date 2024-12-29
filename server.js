import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3210;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server is running under http://localhost:${PORT}`);
    });
