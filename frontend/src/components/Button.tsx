import styled from "styled-components";

const ButtonComponent = styled.button`
    border: 0;
    justify-content: center;
    align-items: center;

    background-color: transparent;

    :hover {
        cursor: pointer;
    }
`

interface Props {
    children?: React.ReactNode,
    style?: React.CSSProperties,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export function Button({ children, style, onClick }: Props) {
    return (
        <ButtonComponent style={style} onClick={onClick}>
            {children}
        </ButtonComponent>
    );
}