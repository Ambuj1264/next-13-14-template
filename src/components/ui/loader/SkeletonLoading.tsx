import Skeleton from "@mui/material/Skeleton";
import React, { FC } from "react";

const SkeletonLoading: FC = () => (
  <div>
    <Skeleton height={260} width={260} animation="wave" />
  </div>
);

export { SkeletonLoading };
