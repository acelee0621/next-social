import prisma from "@/lib/client";
import { Card, CardContent, CardHeader, Stack, Typography } from "@mui/material";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function UserMediaCard({user}:{user:User}) {

const postWithMedia = await prisma.post.findMany({
  where:{
    userId:user.id,
    img:{
      not:null,
    },
  },
  take:8,
  orderBy:{
    createdAt:"desc",
  }, 
});

  return (
    <Card raised sx={{ borderRadius: 1.5 }}>
      <CardHeader      
        disableTypography
        title={
          <Typography variant="body1" color="textSecondary">
            User Media
          </Typography>
        }
        action={
          <Link href="/" className="text-blue-500 text-xs">
          See all
        </Link>
        }        
      />    
      {/* BOTTOM */}
      <CardContent sx={{ px: 2 }}>
      <Stack direction="row" justifyContent="start" gap={1}>
        { postWithMedia.length ? postWithMedia.map(post => (<div className="relative w-1/5 h-24" key={post.id}>
          <Image src={post.img!} alt="" fill className="object-cover rounded-md" />
        </div>)) : "No Media Found!" }
      </Stack> 
      </CardContent>  
    </Card>
  );
}
