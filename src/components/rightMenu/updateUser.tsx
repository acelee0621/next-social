"use client";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useActionState, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { updateProfile } from "@/lib/action";
import UpdateButton from "./UpdateButton";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  FormControl,
  IconButton,
  TextField,
  Typography,
  ButtonBase,
} from "@mui/material";
import { IconCircleLetterX } from "@tabler/icons-react";
import { styled } from "@mui/material/styles";

export default function UpdateUser({ user }: { user: User }) {
  const [open, setOpen] = useState(false);
  const [cover, setCover] = useState<any>(false);

  const [state, formAction] = useActionState(updateProfile, {
    success: false,
    error: false,
  });

  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
    state.success && router.refresh();
  };

  const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: "relative",
    height: 200,
    alignSelf: "center",    
    [theme.breakpoints.down("sm")]: {
      width: "100% !important", // Overrides inline-style
      height: 100,
    },
    "&:hover, &.Mui-focusVisible": {
      zIndex: 1,
      "& .MuiImageBackdrop-root": {
        opacity: 0.15,
      },
      "& .MuiImageMarked-root": {
        opacity: 0,
      },
      "& .MuiTypography-root": {
        border: "4px solid currentColor",
      },
    },
  }));

  const ImageSrc = styled("span")({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",    
  });

  const Image = styled("span")(({ theme }) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  }));

  const ImageBackdrop = styled("span")(({ theme }) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity"),
  }));

  const ImageMarked = styled("span")(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  }));

  

  return (
    <React.Fragment>
      <Button variant="text" size="small" onClick={() => setOpen(true)}>
        Update
      </Button>
      {open && (
        <Dialog open={open} onClose={handleClose}>
          <Card>
            <CardHeader
              title="Update Profile"
              subheader="Use the navbar profile to change the avatar or username."
              action={
                <IconButton onClick={handleClose}>
                  <IconCircleLetterX />
                </IconButton>
              }
            />
            <CardContent>
              <FormControl
                component="form"
                action={(formData) =>
                  formAction({ formData, cover: cover?.secure_url || "" })
                }
              >
                {/* COVER PIC UPLOAD */}
                <CldUploadWidget
                  uploadPreset="social"
                  onSuccess={(result) => setCover(result.info)}
                >
                  {({ open }) => {
                    return (
                      <ImageButton
                        focusRipple
                        onClick={() => open()}
                        style={{
                          width: 400,
                        }}
                      >
                        <ImageSrc
                          style={{ backgroundImage:`url(${user.cover || "/noCover.png"})` }}
                        />
                        <ImageBackdrop className="MuiImageBackdrop-root" />
                        <Image>
                          <Typography
                            component="span"
                            variant="subtitle1"
                            color="inherit"
                            sx={(theme) => ({
                              position: "relative",
                              p: 4,
                              pt: 2,
                              pb: `calc(${theme.spacing(1)} + 6px)`,
                            })}
                          >
                            Change Cover
                            <ImageMarked className="MuiImageMarked-root" />
                          </Typography>
                        </Image>
                      </ImageButton>
                    );
                  }}
                </CldUploadWidget>

                {/* WRAPPER */}
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    gap: 2,
                    px: 3,
                    mb: 3,
                    mt:3
                  }}
                >
                  {/* INPUT */}
                  <TextField
                    size="small"
                    placeholder={user.name || "John"}
                    name="name"
                    label="First Name"
                  />
                  <TextField
                    size="small"
                    placeholder={user.surname || "Doe"}
                    name="surname"
                    label="Surname"
                  />
                  <TextField
                    size="small"
                    placeholder={user.description || "Life is beautiful..."}
                    name="description"
                    label="Description"
                  />
                  <TextField
                    size="small"
                    placeholder={user.city || "New York"}
                    name="city"
                    label="City"
                  />
                  <TextField
                    size="small"
                    placeholder={user.work || "Apple Inc."}
                    name="work"
                    label="Work"
                  />
                </Box>
                <UpdateButton />
                {state.success && (
                  <Typography variant="body1" color="success">
                    Profile has been updated!
                  </Typography>
                )}
                {state.error && (
                  <Typography variant="body1" color="error">
                    Something went wrong!
                  </Typography>
                )}
              </FormControl>
            </CardContent>
          </Card>
        </Dialog>
      )}
    </React.Fragment>
  );
}
