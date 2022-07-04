import React, { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../components/Button";
import { Container } from "../components/Container";
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

export function NewBook() {
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [publisher, setPublisher] = useState('');
    const [releaseDate, setReleaseDate] = useState<Date | null>();

    function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const requestBody = {
            name: name,
            author: author,
            publisher: publisher,
            releaseDate: releaseDate
        };

        console.log(requestBody);

        api.post("/", requestBody)
            .then((res) => {
                alert('Livro criado com sucesso!');
                setName('');
                setAuthor('');
                setPublisher('');
                setReleaseDate(null);
            }).catch((err) => {
                alert('Erro ao salvar livro');
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
                        onChange={(e) => setReleaseDate(e.target.valueAsDate)}
                    />
                </div>

                <button type="submit">Add book</button>
            </FormContainer>
        </Container>
    );
}