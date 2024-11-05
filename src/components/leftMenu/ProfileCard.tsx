import Link from "next/link";
import React from "react";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";

export default async function ProfileCard() {
  const { userId } = auth();

  if (!userId) return null;

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      followers: true,
      _count: {
        select: {
          followers: true,
        },
      },
    },
  });

  const followersId = user?.followers.map((item) => item.followingId);

  const followers = await prisma.user.findMany({
    where: {
      id: { in: followersId },
    },
  });

  if (!user) return null;

  return (
    <Card raised sx={{ borderRadius: 1.5 }}>
      <CardMedia
        sx={{ height: 100 }}
        image={user.cover || "/noCover.png"}
        title="user cover"
      />
      <CardContent sx={{ justifyContent: "center" }} >
        <Avatar
          alt={user.username}
          src={user.avatar || "/noAvatar.png"}
          sx={{ width: 80, height: 80, justifySelf: "center", mt: "-45px" }}
        />
        <Typography gutterBottom variant="h6" justifySelf="center" color="textSecondary">
          {user.name && user.surname
            ? user.name + " " + user.surname
            : "@" + user.username}
        </Typography>
        <Stack direction="row" gap={2} alignItems="center" justifyContent="center">
        <AvatarGroup max={4}>
          {followers.map((follower) => (
            <Avatar
              alt={follower.username}
              key={follower.id}
              src={follower.avatar || "/noAvatar.png"}
              sx={{ width: 30, height: 30 }}
            />
          ))}
        </AvatarGroup>
        <Typography variant="body2" justifySelf="center" color="textSecondary">
          {user._count.followers}&nbsp;&nbsp;&nbsp;Followers
        </Typography>
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button variant="contained">
          <Link href={`/profile/${user.username}`}>My Profile</Link>
        </Button>
      </CardActions>
    </Card>
  );
}
