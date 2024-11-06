import Link from "next/link";
import React from "react";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import {
  AppBar,
  Box,
  CircularProgress,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  IconBell,
  IconCirclePlus,
  IconHome,
  IconMessage,
  IconUserCircle,
  IconUsers,
  IconUsersGroup,
} from "@tabler/icons-react";

export default function Navbar() {
  return (
    <AppBar
      position="sticky"
      sx={{
        px: { sm: 4, md: 8, lg: 16, xl: 32, xxl: 64 },
        bgcolor: "white",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "4rem",
        }}
      >
        {/* LEFT */}
        <Box
          sx={{
            display: { xs: "none", sm: "none", md: "none", lg: "block" },
            width: "20%",
          }}
        >
          <Link href="/">
            <Typography variant="h5" color="primary" fontWeight={700}>
              ACE-SOCIAL
            </Typography>
          </Link>
        </Box>
        {/* CENTER */}
        <Box
          sx={{
            display: { xs:"none",sm: "none", md: "flex" },
            fontSize: "small",
            width: "50%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* LINKS */}
          <Stack direction="row" spacing={6} color="#4b5563">
            <Link href="/" className="flex items-center gap-2">
              <IconHome />
              <Typography variant="body2">Homepage</Typography>
            </Link>
            <Link href="/" className="flex items-center gap-2">
              <IconUsersGroup />
              <Typography variant="body2">Friends</Typography>
            </Link>
            <Link href="/" className="flex items-center gap-2">
              <IconCirclePlus />
              <Typography variant="body2">Stories</Typography>
            </Link>
          </Stack>
        </Box>
        {/* RIGHT */}
        <Stack
          width="30%"
          direction="row"
          spacing={4}
          alignItems="center"
          justifyContent="flex-end"
          sx={{ gap: { xl: 8 } }}
        >
          <ClerkLoading>
            <CircularProgress color="inherit" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedIn>
              <Stack direction="row" spacing={4} alignItems="center">
                <IconUsers color="gray" />
                <IconMessage color="gray" />
                <IconBell color="gray" />
                <UserButton />
              </Stack>
            </SignedIn>
            <SignedOut>
              <Stack direction="row" alignItems="center" spacing={2}>
                <IconUserCircle color="gray" />
                <Link href="/sign-in">
                  <Typography variant="body2" color="black">
                    Login/Register
                  </Typography>
                </Link>
              </Stack>
            </SignedOut>
          </ClerkLoaded>          
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
