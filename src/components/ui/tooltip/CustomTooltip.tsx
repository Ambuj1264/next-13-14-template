import React from "react";
import Tooltip from "@mui/material/Tooltip";

interface CustomTooltipProps {
  title?: string;
  placement?:
    | "bottom"
    | "left"
    | "right"
    | "top"
    | "bottom-end"
    | "bottom-start"
    | "left-end"
    | "left-start"
    | "right-end"
    | "right-start"
    | "top-end"
    | "top-start";
  children?: React.ReactNode;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  title = "Title",
  placement = "bottom",
  children,
}) => {
  return (
    <Tooltip title={title} placement={placement} arrow>
      <div>{children}</div>
    </Tooltip>
  );
};

export default CustomTooltip;
