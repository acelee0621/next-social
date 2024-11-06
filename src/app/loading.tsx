import { Box, CircularProgress, Stack, Typography } from "@mui/material";

const Loading = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center",marginTop:25,bgcolor:"#f1f5f9",height:"100%" }}>
      <Stack direction="column" gap={5}>
        <CircularProgress />
        <Typography variant="h6" color="textSecondary">Loading...</Typography>
      </Stack>
    </Box>
  );
};

export default Loading;
