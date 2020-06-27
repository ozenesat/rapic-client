import React, { useState } from "react";
import "./tabs.css";

function Tabs({ items, onChangeTab }) {
  const [selected, setSelected] = useState(0);
  function handleOnClick(index) {
    setSelected(index);
    onChangeTab(index);
  }
  return (
    <div class="tab-container">
      {items.map((item, index) => (
        <div
          onClick={() => handleOnClick(index)}
          class={`tab-item ${index == selected && "active"}`}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export default Tabs;
