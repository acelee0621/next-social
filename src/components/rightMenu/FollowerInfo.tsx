import Image from "next/image";
import Link from "next/link";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/client";
import FollowerList from "./FollowerList";

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
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/* TOP */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">Follower List</span>
        <Link href="/" className="text-blue-500 text-xs">
          See all
        </Link>
      </div>
      {/* USER */}
      <FollowerList follower={followers} />
    </div>
  );
}
