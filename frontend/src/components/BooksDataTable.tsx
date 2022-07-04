import { useEffect, useState } from "react";
import styled from "styled-components";
import { BsTrash, BsPencil, BsPlusCircle } from "react-icons/bs";
import { api } from "../util/Api";
import { Book } from "../interfaces/Book";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

const DataTable = styled.table`
    border-collapse: collapse;
    width: 100%;

    th, td {
        border: 1px solid #FFF;
        text-align: left;
        padding: 8px;
        font-size: 32px;
    }

    th {
        background-color: rgb(177, 201, 250);
    }

    td {
        background-color: rgb(205, 235, 253);
    }
`

export function BooksDataTable() {
    const [books, setBooks] = useState<Book[]>([]);
    const navigate = useNavigate();

    function onDeletePress(book: Book) {
        api.delete(`/${book.id}`).then((_) => {
            let temp = books.filter((b) => b.id != book.id);

            setBooks(temp);
        });
    }

    useEffect(() => {
        api.get("/").then((response) => {
            setBooks(response.data);
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    return (
        <div style={{ width: "100%" }}>
            <DataTable>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Author</th>
                        <th>Publisher</th>
                        <th>Release Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.name}</td>
                            <td>{book.author}</td>
                            <td>{book.publisher}</td>
                            <td>{book.releaseDate.toString().split('T')[0]}</td>

                            <td>
                                <div>
                                    <Button
                                        onClick={(e) => navigate('/edit', { state: { book: book } })}
                                    >
                                        <BsPencil size={32} color="#f5eb2d" />
                                    </Button>
                                    <Button
                                        onClick={(e) => onDeletePress(book)}
                                    >
                                        <BsTrash size={32} color="#b32727" />
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </DataTable>
        </div>
    );
}