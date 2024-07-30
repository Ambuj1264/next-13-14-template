import { greyColor, guttersPx } from "@/styles/variables";
import styled from "@emotion/styled";
import React, { useState, useRef, useEffect } from "react";

interface Option {
  id: number;
  name: string;
  value: string;
}

interface DropdownProps {
  items: Option[];
  onItemClick: (item: string) => void;
  children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({
  items,
  onItemClick,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownClick = (event: React.MouseEvent<any>) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: string) => {
    onItemClick(item);
    setIsOpen(false);
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={handleDropdownClick}>{children}</DropdownButton>
      {isOpen && (
        <DropdownContent ref={dropdownRef}>
          {items.map((item) => (
            <DropdownItem
              key={item.name}
              onClick={() => handleItemClick(item.value)}
            >
              {item.name}
            </DropdownItem>
          ))}
        </DropdownContent>
      )}
    </DropdownContainer>
  );
};

export default Dropdown;

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownButton = styled.div`
  cursor: pointer;
`;

const DropdownContent = styled.div`
  position: absolute;
  top: 100%;
  width: max-content;
  left: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid ${greyColor};
  max-height: 300px;
  overflow-y: auto;
`;

const DropdownItem = styled.div`
  padding: ${guttersPx.smallHalf} ${guttersPx.small};
  cursor: pointer;
`;
