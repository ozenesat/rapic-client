import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Button = styled.button`
  align-self: flex-end;
  margin: 10px 0 10px 0;
  border: 1px solid gray;
  padding: 10px;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
`;

export { Container, Button };
