import React from "react";
import Skeletor from "../../skeletor/Skeletor";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

const DataCounterSectionSkeleton = () => {
  return (
    <Paper elevation={3}>
      <Box p={2}>
        <Skeletor
          variant="text"
          width={200}
          height={20}
          sx={{ marginBottom: 1 }}
        />
        <Skeletor
          variant="text"
          width={100}
          height={30}
          sx={{ marginBottom: 1 }}
        />
        <Skeletor
          variant="text"
          width={200}
          height={60}
          sx={{ marginBottom: 1 }}
        />
      </Box>
    </Paper>
  );
};

export default DataCounterSectionSkeleton;
