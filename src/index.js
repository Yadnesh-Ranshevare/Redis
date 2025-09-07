import express from "express";

import client from "./db.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.post("/redis", async (req, res) => {
    try {
        const data = req.body;
        await client.set("name", data?.name);
        res.send("POST request to the Redis endpoint");
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
