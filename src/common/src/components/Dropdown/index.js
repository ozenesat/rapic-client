import React, { useState, useEffect } from "react";
import {
  DropdownMenuWrapper,
  DropdownMenuItemsWrapper,
  DropdownMenuItemWrapper,
} from "./dropdown.style";
import { Icon } from "react-icons-kit";
import { ic_arrow_drop_down } from "react-icons-kit/md/ic_arrow_drop_down";

const DropdownMenu = (props) => {
  const [menuState, setMenuState] = useState({
    show: false,
  });

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => {
      window.removeEventListener("click", handleDocumentClick);
    };
  });

  const handleToggle = () => {
    setMenuState((prevState) => ({
      ...menuState,
      show: !prevState.show,
    }));
  };

  const handleDocumentClick = () => {
    if (menuState.show) {
      handleToggle();
    }
  };

  const {
    content,
    dropdownItems,
    dropdownDirection,
    className,
    iconSize,
    onSelect,
  } = props;

  return (
    <DropdownMenuWrapper
      onClick={(e) => e.stopPropagation()}
      className={className}
    >
      <span onClick={handleToggle}>
        {content}
        <Icon icon={ic_arrow_drop_down} size={iconSize} className="icon" />
      </span>
      {menuState.show && (
        <DropdownMenuItemsWrapper dropdownDirection={dropdownDirection}>
          {dropdownItems &&
            dropdownItems.map((item, index) => (
              <DropdownMenuItemWrapper
                key={index}
                onClick={() => {
                  handleToggle();
                  onSelect(item);
                }}
              >
                {item}
              </DropdownMenuItemWrapper>
            ))}
        </DropdownMenuItemsWrapper>
      )}
    </DropdownMenuWrapper>
  );
};

export default DropdownMenu;
