import React from "react";
import Skeletor from "../../skeletor/Skeletor";

const MoreInformationDealsListSkeleton = () => {
  return (
    <>
      <Skeletor
        variant="text"
        width={"100%"}
        height={40}
        sx={{ marginBottom: 1 }}
      />
      <Skeletor
        variant="text"
        width={"100%"}
        height={40}
        sx={{ marginBottom: 1 }}
      />
      <Skeletor
        variant="text"
        width={"100%"}
        height={40}
        sx={{ marginBottom: 1 }}
      />
      <Skeletor
        variant="text"
        width={"100%"}
        height={40}
        sx={{ marginBottom: 1 }}
      />
      <Skeletor
        variant="text"
        width={"100%"}
        height={5}
        sx={{ marginBottom: 1 }}
      />
      <Skeletor
        variant="text"
        width={"100%"}
        height={40}
        sx={{ marginBottom: 2 }}
      />
    </>
  );
};

export default MoreInformationDealsListSkeleton;
