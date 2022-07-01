import styled from "styled-components";
import { BsPlusCircle } from "react-icons/bs";

import { Link } from "react-router-dom";
import { Container } from "../components/Container";
import { BooksDataTable } from "../components/BooksDataTable";
import { Button } from "../components/Button";

export function Home() {
    return (
        <Container>
            <BooksDataTable />

            <Button style={{ marginTop: 25 }}>
                <Link to="/new">
                    <BsPlusCircle size={64} color="#50ce2d" />
                </Link>
            </Button>
        </Container>
    );
};