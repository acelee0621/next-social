"use client";
import { Button } from "@mui/material";
import React from "react";
import { useFormStatus } from "react-dom";

export default function UpdateButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="contained"
      disabled={pending}
      sx={{ width: "100px", alignSelf: "center" }}
    >
      {pending ? "Updating..." : "Update"}
    </Button>
  );
}
