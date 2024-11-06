"use client";

import { addComment } from "@/lib/action";
import { useUser } from "@clerk/nextjs";
import {
  Avatar,  
  Divider,
  FormControl,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Comment, User } from "@prisma/client";
import { IconDots, IconThumbUp } from "@tabler/icons-react";
import Image from "next/image";
import { useOptimistic, useState } from "react";
type CommentWithUser = Comment & { user: User };

const CommentList = ({
  comments,
  postId,
}: {
  comments: CommentWithUser[];
  postId: number;
}) => {
  const { user } = useUser();
  const [commentState, setCommentState] = useState(comments);
  const [desc, setDesc] = useState("");

  const add = async () => {
    if (!user || !desc) return;

    addOptimisticComment({
      id: Math.random(),
      desc,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      userId: user.id,
      postId: postId,
      user: {
        id: user.id,
        username: "Sending Please Wait...",
        avatar: user.imageUrl || "/noAvatar.png",
        cover: "",
        description: "",
        name: "",
        surname: "",
        city: "",
        work: "",
        createdAt: new Date(Date.now()),
      },
    });
    try {
      const createdComment = await addComment(postId, desc);
      setCommentState((prev) => [createdComment, ...prev]);
    } catch (err) {}
  };

  const [optimisticComments, addOptimisticComment] = useOptimistic(
    commentState,
    (state, value: CommentWithUser) => [value, ...state]
  );
  return (
    <>
      {user && (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          gap={1}
        >
          <Avatar
            alt="Avatar"
            src={user.imageUrl || "noAvatar.png"}
            sx={{ width: 32, height: 32 }}
          />
          <FormControl component="form" action={add} fullWidth>
            <TextField
              id="comment"
              size="small"
              variant="outlined"
              placeholder="Write a comment..."
              onChange={(e) => setDesc(e.target.value)}
            />
          </FormControl>
          <Image
            src="/emoji.png"
            alt=""
            width={16}
            height={16}
            className="cursor-pointer"
          />
        </Stack>
      )}
      <div className="">
        {/* COMMENT */}
        {optimisticComments.map((comment) => (
          <Stack
            direction="row"            
            gap={2}
            key={comment.id}
            sx={{mt:3}}
          >
            <Avatar
              alt="Avatar"
              src={comment.user.avatar || "noAvatar.png"}
              sx={{ width: 40, height: 40 }}
            />
            <Stack direction="column" gap={1} sx={{width:"100%"}}>
              <Typography variant="body1" color="textSecondary">
                {comment.user.name && comment.user.surname
                  ? comment.user.name + " " + comment.user.surname
                  : "@" + comment.user.username}
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{bgcolor:"#f1f5f9",borderRadius:4,px:2,py:1}}>
                {comment.desc}
              </Typography>
              <Stack direction="row" alignItems="center" gap={2} sx={{ mt: 1 }}>
                <Stack direction="row" alignItems="center" gap={1}>
                  <IconThumbUp />
                  <Divider orientation="vertical" variant="middle" flexItem />
                  <Typography variant="body1" color="textSecondary">
                    0 Likes
                  </Typography>
                </Stack>
                <Typography variant="body1" color="textSecondary">
                  Reply
                </Typography>
              </Stack>
            </Stack>
            <IconButton sx={{alignSelf:"start",justifySelf:"end"}}>
              <IconDots />
            </IconButton>
          </Stack>
        ))}
      </div>
    </>
  );
};

export default CommentList;
