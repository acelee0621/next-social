import Feed from "@/components/feed/Feed";
import LeftMenu from "@/components/leftMenu/LeftMenu";
import RightMenu from "@/components/rightMenu/RightMenu";
import prisma from "@/lib/client";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { notFound } from "next/navigation";
import React from "react";

export default async function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const username = params.username;

  const user = await prisma.user.findFirst({
    where: {
      username,
    },
    include: {
      _count: {
        select: {
          followers: true,
          followings: true,
          posts: true,
        },
      },
    },
  });

  if (!user) return notFound();

  return (
    <Stack direction="row" gap={4} pt={4}>
      <Box
        sx={{
          display: { xs: "none", sm: "none", md: "none", lg: "block" },
          width: "20%",
        }}
      >
        <LeftMenu type="profile" />
      </Box>
      <Stack
        direction="column"
        spacing={4}
        sx={{
          width: { xs: "100%", sm: "100%", md: "100%", lg: "70%", xl: "50%" },
        }}
      >
        <Card raised sx={{ borderRadius: 1.5 }}>
          <CardMedia
            sx={{ height: 256 }}
            image={user.cover || "/noCover.png"}
            title="user cover"
          />
          <CardContent sx={{ justifyContent: "center" }}>
            <Avatar
              alt={user.username}
              src={user.avatar || "/noAvatar.png"}
              sx={{
                width: 128,
                height: 128,
                justifySelf: "center",
                mt: "-70px",
              }}
            />
            <Typography
              gutterBottom
              variant="h4"
              justifySelf="center"
              color="textSecondary"
              fontWeight={700}
            >
              {user.name && user.surname
                ? user.name + " " + user.surname
                : "@" + user.username}
            </Typography>

            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              gap={9}
              my={3}
            >
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Typography
                  variant="body1"
                  color="textSecondary"
                  fontWeight={500}
                >
                  {user._count.posts}
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  fontWeight={500}
                >
                  Posts
                </Typography>
              </Stack>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Typography
                  variant="body1"
                  color="textSecondary"
                  fontWeight={500}
                >
                  {user._count.followers}
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  fontWeight={500}
                >
                  Followers
                </Typography>
              </Stack>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Typography
                  variant="body1"
                  color="textSecondary"
                  fontWeight={500}
                >
                  {user._count.followings}
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  fontWeight={500}
                >
                  Following
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
        <Feed username={user.username} />
      </Stack>
      <Box
        sx={{
          display: { xs: "none", sm: "none", md: "none", lg: "block" },
          width: "30%",
        }}
      >
        <RightMenu user={user} />
      </Box>
    </Stack>
  );
}
