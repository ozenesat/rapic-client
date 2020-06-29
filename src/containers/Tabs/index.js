import React, { useState } from "react";
import { Item, Container } from "./tabs.style";

function Tabs({ items, onChangeTab }) {
  const [selected, setSelected] = useState(0);
  function handleOnClick(index) {
    setSelected(index);
    onChangeTab(index);
  }
  return (
    <Container>
      {items.map((item, index) => (
        <Item onClick={() => handleOnClick(index)} isActive={index == selected}>
          {item}
        </Item>
      ))}
    </Container>
  );
}

export default Tabs;
