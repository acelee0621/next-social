import Link from "next/link";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/client";
import FollowerList from "./FollowerList";
import { Card, CardHeader, Typography } from "@mui/material";

export default async function FollowerInfo() {
  const { userId } = auth();

  if (!userId) return null;

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      followers: true,
    },
  });

 
 const followersId = user?.followers.map(item=>item.followingId)
 
 const followers = await prisma.user.findMany({
    where: {
      id: { in: followersId },
    },
  });

 

  if (user?.followers.length === 0) return null;

  return (
    <Card raised sx={{ borderRadius: 1.5 }}>
      <CardHeader      
        disableTypography
        title={
          <Typography variant="body1" color="textSecondary">
            Follower List
          </Typography>
        }
        action={
          <Link href="/" className="text-blue-500 text-xs">
          See all
        </Link>
        }        
      />
           
      {/* FOLLOWER */}
      <FollowerList follower={followers} />    
    
    </Card>
  );
}
