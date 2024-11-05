import Image from 'next/image'
import React, { Suspense } from 'react'
import { Post as PostType, User } from "@prisma/client";
import { auth } from '@clerk/nextjs/server';

import Comments from './Comments';
import PostInfo from './PostInfo';
import { Avatar, Card, CardContent, CardHeader, Typography } from '@mui/material';
import PostInteraction from './PostInteraction';



type FeedPostType = PostType & { user: User } & {
  likes: [{ userId: string }];
} & {
  _count: { comments: number };
};

export default async function Post({ post }: { post: FeedPostType }) {
  const { userId } = auth();


  return (
    <Card raised sx={{ borderRadius: 1.5 }}>
      <CardHeader
        avatar={
          <Avatar
          alt='Avatar'
          src={post.user.avatar || "/noAvatar.png"}
          sx={{ width: 40, height: 40 }}
        />
        }
        action={
          userId === post.user.id && <PostInfo postId={post.id} />
          
        }
        disableTypography
        title={
          <Typography variant="body1" color="textSecondary">
            {post.user.name && post.user.surname
          ? post.user.name + " " + post.user.surname
          : '@' + post.user.username}
          </Typography>
        }               
      />      
      {/* DESC */}
      <CardContent>
      <div className="flex flex-col gap-4">
        {post.img && (
          <div className="w-full min-h-96 relative">
            <Image
              src={post.img}
              fill
              className="object-cover rounded-md"
              alt="post-image"
            />
          </div>
        )}
        <p>{post.desc}</p>
      </div>
      {/* INTERACTION */}
      <Suspense fallback="Loading...">
        <PostInteraction
          postId={post.id}
          likes={post.likes.map((like) => like.userId)}
          commentNumber={post._count.comments}
        />
      </Suspense>
      <Suspense fallback="Loading...">
        <Comments postId={post.id} />
      </Suspense>
      </CardContent>
    </Card>
  )
}
