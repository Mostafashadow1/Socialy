import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { Stack, Box } from "@mui/material";
function LoadingPosts() {
  return (
    <Stack spacing={2} top marginTop="20px">
      <Box display="flex" gap="20px">
        <Skeleton
          sx={{ bgcolor: "var(--secondColor)" }}
          variant="circular"
          width={70}
          height={70}
        />
        <Stack justifyContent="center">
          <Skeleton
            sx={{ bgcolor: "var(--secondColor)" }}
            variant="text"
            width={200}
            height={20}
          />
          <Skeleton
            sx={{ bgcolor: "var(--secondColor)" }}
            variant="text"
            width={200}
            height={20}
          />
        </Stack>
      </Box>
      <Skeleton
        sx={{ bgcolor: "var(--secondColor)" }}
        variant="rectangular"
        height={400}
      />
      <Skeleton
        sx={{ bgcolor: "var(--secondColor)" }}
        variant="rectangular"
        height={50}
      />
    </Stack>
  );
}

export default LoadingPosts;
