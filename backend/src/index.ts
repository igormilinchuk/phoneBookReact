import cors from "cors";
import express from "express";

import contactsRouter from "./routes/contacts.routes.js";
import { errorHandler } from "./middleware/error-handler.js";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_request, response) => {
    response.status(200).json({
        status: "ok",
        message: "Phonebook API is running",
    });
});

app.use(
    "/api/contacts",
    contactsRouter
);

app.use(errorHandler);

app.listen(port, () => {
    console.log(
        `Server is running at http://localhost:${port}`
    );
});