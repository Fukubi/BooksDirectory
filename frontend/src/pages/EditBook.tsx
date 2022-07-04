import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../components/Button";
import { Container } from "../components/Container";
import { Book } from "../interfaces/Book";
import { api } from "../util/Api";

const FormContainer = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    div {
        margin-bottom: 10px;
    }

    label {
        display: inline-block;
        width: 150px;
        margin-right: 5px;
        text-align: right;
    }

    input {
        width: 150px;
    }
`

interface LocationState {
    book: Book
}

export function EditBook() {
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [publisher, setPublisher] = useState('');
    const [releaseDate, setReleaseDate] = useState<Date | null>();
    const location = useLocation();
    const navigate = useNavigate();
    const [book, setBook] = useState<Book>((location.state as LocationState).book);

    useEffect(() => {
        console.log(book);
        setName(book.name);
        setAuthor(book.author);

        if (book.publisher)
            setPublisher(book.publisher);

        setReleaseDate(book.releaseDate);
    }, []);

    function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const requestBody = {
            id: book.id,
            name: name,
            author: author,
            publisher: publisher,
            releaseDate: releaseDate
        };

        console.log(requestBody);

        api.patch("/", requestBody)
            .then((_) => {
                alert('Livro editado com sucesso!');
                navigate('/');
            }).catch((_) => {
                alert('Erro ao editar livro');
            });
    }

    return (
        <Container>
            <div>
                <Button>
                    <Link to="/">
                        <BsArrowLeft size={32} color="#000" />
                    </Link>
                </Button>
            </div>

            <FormContainer onSubmit={onFormSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="author">Author:</label>
                    <input
                        type="text"
                        name="author"
                        id="author"
                        required
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="publisher">Publisher:</label>
                    <input
                        type="text"
                        name="publisher"
                        id="publisher"
                        required
                        value={publisher}
                        onChange={(e) => setPublisher(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="release-date">Release date:</label>
                    <input
                        type="date"
                        name="release-date"
                        id="release-date"
                        value={releaseDate?.toString().split('T')[0]}
                        onChange={(e) => {
                            setReleaseDate(e.target.valueAsDate?.toISOString().split('T')[0] as undefined);
                        }}
                    />
                </div>

                <button type="submit">Edit book</button>
            </FormContainer>
        </Container>
    );
}