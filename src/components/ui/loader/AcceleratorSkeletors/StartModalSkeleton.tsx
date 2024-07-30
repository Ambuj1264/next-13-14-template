import React from "react";
import Skeletor from "../../skeletor/Skeletor";
const StartModalSkeleton = () => {
  return (
    <>
      <Skeletor variant="text" width="100%" height={5} />

      <Skeletor
        variant="text"
        width="100%"
        height={20}
        sx={{ margin: "30px 0" }}
      />
      <Skeletor variant="rectangular" width={825} height={498} />
    </>
  );
};

export default StartModalSkeleton;
