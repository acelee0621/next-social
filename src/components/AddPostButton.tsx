"use client";

import { Button, CircularProgress, Stack } from "@mui/material";
import { useFormStatus } from "react-dom";

const AddPostButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button variant="contained" disabled={pending} type="submit">
      {pending ? (
        <Stack direction="row" gap={1} justifyContent="center">
          <CircularProgress size="30px" />
          Sending
        </Stack>
      ) : (
        "Send"
      )}
    </Button>
  );
};

export default AddPostButton;
