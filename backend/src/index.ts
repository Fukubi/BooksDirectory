import "dotenv/config";
import express from "express";
import { booksRouter } from "./booksRoutes";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/book", booksRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});