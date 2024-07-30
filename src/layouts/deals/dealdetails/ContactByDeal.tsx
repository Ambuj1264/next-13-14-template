import {
  darkCharcoalColor,
  lightRedColor,
  whiteColor,
} from "@/styles/variables";
import { copyToClipboard, keyType, openToNewTab } from "@/utils/helperUtils";
import styled from "@emotion/styled";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";

const shapeStyles = { bgcolor: "#C3DDE8", width: "60px", height: "60px" };
const shapeCircleStyles = { borderRadius: "50%" };

const StyledImage = styled(Image)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

interface DealProps {
  setName: (arg1: string) => void;
  data: Record<string, any>;
  handleForm: (socail: any, value: boolean) => void;
}

const ContactByDeal = ({ setName, data, handleForm }: DealProps) => {
  const ref = useRef<any>(null);
  const [open, setOpen] = useState<number | null>();
  const toggle = (id: number) => {
    setOpen(open === id ? null : id);
  };

  const handleClick = (
    e: { button: number; target: { id: string } },
    id: number,
    url: string,
    type: string,
  ) => {
    if (e.button === keyType.LEFT && e.target.id === "root") {
      openToNewTab(url, type);
    } else if (e.button === keyType.RIGHT) {
      toggle(id);
    }
  };

  const handleClickOutside = useCallback(
    (event: { target: any }) => {
      if (ref.current && !ref.current?.contains(event.target)) {
        setOpen(null);
      }
    },
    [ref],
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <>
      {modalImages?.map((item) => {
        return (
          <Stack direction="row" spacing={2} key={item.id}>
            <Badge
              overlap="circular"
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: !!data?.getDealById?.[item.name]
                    ? "#67D64B;"
                    : lightRedColor,
                },
              }}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Box
                component="span"
                ref={ref}
                id="root"
                sx={{ ...shapeStyles, ...shapeCircleStyles }}
                onMouseDown={(e: any) => {
                  handleClick(
                    e,
                    item.id,
                    data?.getDealById?.[item.name],
                    item.name,
                  );
                }}
                onContextMenu={(e: { preventDefault: () => void }) =>
                  e.preventDefault()
                }
              >
                <StyledImage src={item.icon} alt="img" width={21} height={21} />
                {open === item.id && (
                  <MultipleButtonsDropdown
                    onOpen={setOpen}
                    handleForm={handleForm}
                    name={item.name}
                    url={data?.getDealById?.[item.name]}
                    setName={setName}
                    isOpen={open}
                    isAdd={!!data?.getDealById?.[item.name]}
                  />
                )}
              </Box>
            </Badge>
          </Stack>
        );
      })}
    </>
  );
};

export default ContactByDeal;

const modalImages = [
  { id: 1, icon: "/assets/icons/Email.png", status: true, name: "email" },
  { id: 2, icon: "/assets/icons/Phone.png", status: true, name: "phone" },
  {
    id: 3,
    icon: "/assets/icons/image 24.png",
    status: false,
    name: "calendly",
  },
  { id: 4, icon: "/assets/icons/LinkedIn.png", status: true, name: "linkedin" },
  { id: 5, icon: "/assets/icons/Web.png", status: false, name: "webURL" },
];

const Dropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 0;
  background-color: ${darkCharcoalColor};
  display: ${(props) => (props.isOpen ? "block" : "none")};
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 8px 10px;
  padding-bottom: 0px;
  max-width: 98px;
`;

const DropdownItem = styled.div`
  padding: 8px 10px;
  cursor: pointer;
  color: ${whiteColor};
  font-size: 8px;
  font-weight: 500;
  &:hover {
    background-color: #0277b6;
  }
`;

const DropdownContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const DropdownOption = styled.div`
  margin-bottom: 8px;
`;
interface DropDownProp {
  isOpen: any;
  isAdd: boolean;
  setName: (arg: string) => void;
  name: string;
  onOpen: any;
  handleForm: (arg1: any, arg2: boolean) => void;
  url: string;
}
export const MultipleButtonsDropdown = ({
  isOpen,
  isAdd,
  setName,
  name,
  onOpen,
  handleForm,
  url,
}: DropDownProp) => {
  const dealForm = () => {
    handleForm("social", true);
    setName(name);
    onOpen(null);
  };
  return (
    <div>
      <Dropdown isOpen={isOpen}>
        <DropdownContent>
          <DropdownOption>
            {!isAdd ? (
              <DropdownItem onClick={dealForm}>Add</DropdownItem>
            ) : (
              <>
                <DropdownItem
                  onClick={() => {
                    openToNewTab(url, name);
                    onOpen(null);
                  }}
                >
                  Open
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    copyToClipboard(url);
                    onOpen(null);
                  }}
                >
                  Copy
                </DropdownItem>
                <DropdownItem onClick={dealForm}>Edit</DropdownItem>
              </>
            )}
          </DropdownOption>
        </DropdownContent>
      </Dropdown>
    </div>
  );
};
