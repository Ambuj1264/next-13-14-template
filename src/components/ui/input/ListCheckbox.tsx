import React from "react";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { borderRadiusCircle } from "@/styles/variables";
import styled from "@emotion/styled";
import { Avatar, SxProps } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { getInitials } from "../avatar/Avatar";

interface MenuItemProp {
  title: string;
  icon?: string | null;
}
interface ListProps {
  checkedValue: boolean;
  data: MenuItemProp;
  sx: SxProps;
}

const ListCheckbox = ({ data, sx, checkedValue, ...props }: ListProps) => {
  return (
    <MenuItem {...props} key={data.title} value={data.title}>
      <Checkbox checked={checkedValue} />
      {data.icon ? (
        <StyledAvatar alt={data.title} src={data.icon} />
      ) : (
        <StyledAvatar>{getInitials(data.title)}</StyledAvatar>
      )}
      <ListItemText primary={data.title} />
    </MenuItem>
  );
};

export default ListCheckbox;

const AvatarStyle = {
  width: 23,
  height: 23,
  borderRadius: borderRadiusCircle,
  marginRight: 2,
};

const StyledAvatar = styled(Avatar)`
  ${AvatarStyle};
  color: white;
  font-size: 10px;
  font-weight: 600;
`;
