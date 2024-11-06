import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import UserInfoCardInteraction from "./UserInfoCardInteraction";
import UpdateUser from "./updateUser";
import { Card, CardContent, CardHeader, Stack, Typography } from "@mui/material";

export default async function UserInfoCard({ user }: { user: User }) {
  const createdAtDate = new Date(user.createdAt);
  const formattedDate = createdAtDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let isFollowing = false;

  const { userId: currentUserId } = auth();

  if (currentUserId) {
    const followRes = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: user.id,
      },
    });

    followRes ? (isFollowing = true) : (isFollowing = false);
  }

  return (
    <Card raised sx={{ borderRadius: 1.5 }}>
      <CardHeader
        disableTypography
        title={
          <Typography variant="body1" color="textSecondary">
            User Information
          </Typography>
        }
        action={
          currentUserId === user.id ? (
            <UpdateUser user={user} />
          ) : (
            <Link href="/" className="text-blue-500 text-xs">
              See all
            </Link>
          )
        }
      />      
        {/* BOTTOM */}
        <CardContent>
        <Stack direction="column" gap={1}>
        <Stack direction="row" alignItems="center" gap={1} justifyContent="flex-start">
          <Typography variant="h5" color="textSecondary" fontWeight={500}>
              {user.name && user.surname
                ? user.name + " " + user.surname
                : user.username}
            </Typography>
            <Typography variant="body1" color="textSecondary">@{user.username}</Typography>
          </Stack>
          {user.description && <Typography variant="caption" color="textSecondary">{user.description}</Typography>}

          {user.city && (
            <Stack direction="row" alignItems="center" gap={1} justifyContent="flex-start">
              <Image src="/map.png" alt="" width={16} height={16} />
              <Typography variant="body2" color="textSecondary">
                Living in <b>{user.city}</b>
                </Typography>
            </Stack>
          )}

          {user.work && (
            <Stack direction="row" alignItems="center" gap={1} justifyContent="flex-start">
              <Image src="/work.png" alt="" width={16} height={16} />
              <Typography variant="body2" color="textSecondary">
                Works at <b>{user.work}</b>
                </Typography>
            </Stack>
          )}

          
            <Stack direction="row" alignItems="center" gap={1} justifyContent="flex-start">
              <Image src="/date.png" alt="" width={16} height={16} />
              <Typography variant="body2" color="textSecondary">Joined {formattedDate} </Typography>
            </Stack>
          

          {currentUserId && currentUserId !== user.id && (
            <UserInfoCardInteraction
              userId={user.id}
              isFollowing={isFollowing}
            />
          )}
        </Stack>
        </CardContent>            
    </Card>
  );
}
