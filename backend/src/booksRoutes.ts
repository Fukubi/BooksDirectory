import { Book, PrismaClient } from "@prisma/client";
import { Router } from "express";

const booksRouter = Router();
const prisma = new PrismaClient();

/**
 * Middleware to fix CORS issues
 */
 booksRouter.use((_, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

booksRouter.get("/", async (_, res) => {
    res.send(await prisma.book.findMany());
});

booksRouter.get("/:id", async(req, res) => {
    const id = Number(req.params.id);

    if (!id) {
        res.status(400).send({ msg: "Missing Id parameter" });
        return;
    }

    const bookFound = await prisma.book.findUnique({
        where: {
            id: id,
        }
    });

    res.send(bookFound);
});

booksRouter.post("/", async (req, res) => {
    const book: Book = req.body;
    book.releaseDate = new Date(req.body.releaseDate);

    if (book.id) {
        res.status(400).send({ msg: "ID isn't permitted while creating a new register" });
        return;
    }

    const createdBook = await prisma.book.create({
        data: book
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ msg: "Internal Server Error" });
    });

    res.status(201).send(createdBook);
});

booksRouter.patch("/", async (req, res) => {
    const book: Book = req.body;
    book.releaseDate = new Date(req.body.releaseDate);

    if (!book.id) {
        res.status(400).send({ msg: "Id field missing" });
        return;
    }

    const updatedBook = await prisma.book.update({
        data: book,
        where: {
            id: book.id,
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ msg: "Internal Server Error" });
    });

    res.send(updatedBook);
});

booksRouter.delete("/:id", async (req, res) => {
    const id = Number(req.params.id);

    if (!id) {
        res.status(400).send({ msg: "Missing Id parameter" });
        return;
    }

    const deletedBook = await prisma.book.delete({
        where: {
            id: id,
        }
    });

    res.send(deletedBook);
});

export { booksRouter };