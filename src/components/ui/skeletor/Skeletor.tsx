import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { SxProps } from "@mui/material/styles";

interface SkeletorProps {
  variant?: "text" | "rectangular" | "circular";
  width?: number | string;
  height?: number;
  sx?: SxProps;
}

const Skeletor: React.FC<SkeletorProps> = ({ variant, width, height, sx }) => {
  return (
    <Skeleton
      variant={variant}
      width={width || 240}
      height={height || 15}
      sx={sx}
      animation="wave"
    />
  );
};

export default Skeletor;
