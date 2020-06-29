import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #919191;
  margin-bottom: 10px;
`;
const Item = styled.div`
  padding: 10px 40px 10px 0;
  margin-bottom: -1px;
  cursor: pointer;
  font-size: 17px;
  color: #919191;
  font-weight: bold;
  ${(props) =>
    props.isActive &&
    `border-bottom: 3px solid #34bf2f;
    color: #34bf2f;
    transition: border-color 0.5s ease;`}
`;

export { Container, Item };
