"use client";

import prisma from "@/lib/client";
import { User } from "@prisma/client";
import Image from "next/image";
import React, { useOptimistic, useState } from "react";



export default function FollowerList({
  follower
}: {
  follower: User[];
}) {  

 
  return (
    <div className="">
      {follower?.map((item) => (
        <div className="flex items-center justify-between" key={item.id}>
          <div className="flex items-center gap-4">
            <Image
              src={item.avatar || "/noAvatar.png"}
              alt="sender avatar"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-semibold">
              {item.name && item.surname
                ? item.name + " " + item.surname
                : item.username}
            </span>
          </div>          
        </div>
      ))}
    </div>
  );
}
