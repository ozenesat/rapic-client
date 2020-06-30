import styled from "styled-components";
const Table = styled.div`
  display: table;
  width: 100%;
  border: 1px solid grey;
`;
const Row = styled.div`
  display: table-row;
  background-color: ${(props) => (props.isActive ? "#eee" : "#fff")};
`;

const Heading = styled.div`
  display: table-header-group;
  font-weight: bold;
`;

const Cell = styled.div`
  display: table-cell;
  padding: 3px 10px;
`;
const Head = styled.div`
  display: table-cell;
  padding: 3px 10px;
  border-bottom: 1px solid grey;
`;

const Body = styled.div`
  display: table-row-group;
`;

export { Body, Cell, Head, Row, Heading, Table };
