import styled from "styled-components";

const ContainerComponent = styled.div`
    display: flex;
    flex-direction: column;

    width: 100vw;
    height: 100vh;
`;

interface Props {
    children: React.ReactNode;
}

export function Container({ children }: Props) {
    return (
        <ContainerComponent>
            {children}
        </ContainerComponent>
    );
}