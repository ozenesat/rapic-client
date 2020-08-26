import styled from "styled-components";
const Table = styled.div`
  display: table;
  width: 100%;
  border: 1px solid #919191;
  border-radius: 5px;
`;
const Row = styled.div`
  display: table-row;
  background-color: #fff;
`;

const Heading = styled.div`
  display: table-header-group;
  font-weight: bold;
`;

const Cell = styled.div`
  display: table-cell;
  padding: 10px 0 10px 10px;
  border-bottom: 1px solid #919191;
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
