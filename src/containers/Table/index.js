import { Cell, Table, Heading, Head, Body, Row } from "./table.style";

function TableView({ data, headers, onClickEdit, onClickDelete }) {
  return (
    <Table>
      <Heading>
        {headers.map((item) => (
          <Head>{item}</Head>
        ))}
      </Heading>
      <Body>
        {data.map((item, index) => {
          const keys = Object.keys(item);
          return (
            <Row isActive={index % 2 != 0}>
              {keys.map((key) => (
                <Cell>{item[key]}</Cell>
              ))}
              <Cell>
                <button onClick={() => onClickEdit(item)}>Edit</button>
                <button onClick={() => onClickDelete(item)}>Delete</button>
              </Cell>
            </Row>
          );
        })}
      </Body>
    </Table>
  );
}

export default TableView;
