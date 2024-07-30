import React from "react";
import Badge from "@mui/material/Badge";
import { SxProps, Theme } from "@mui/material";

interface BadgeProps {
  badgecontent: number | string;
  anchororigin: any;
  children: React.ReactNode;
  color?: string;
  sx?: SxProps<Theme>;
}

const StyledBudge = ({
  badgecontent,
  anchororigin,
  sx,
  children,
}: BadgeProps) => {
  return (
    <>
      {" "}
      <Badge sx={sx} badgeContent={badgecontent} anchorOrigin={anchororigin}>
        {children}
      </Badge>
    </>
  );
};

export default StyledBudge;
