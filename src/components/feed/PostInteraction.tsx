"use client";

import { switchLike } from "@/lib/action";
import { useAuth } from "@clerk/nextjs";
import {  
  Divider,
  FormControl,  
  Stack,
  Typography,
} from "@mui/material";
import {
  IconMessage,
  IconShare,
  IconThumbUp,
  IconThumbUpFilled,
} from "@tabler/icons-react";
import { useOptimistic, useState } from "react";

export default function PostInteraction({
  postId,
  likes,
  commentNumber,
}: {
  postId: number;
  likes: string[];
  commentNumber: number;
}) {
  const { isLoaded, userId } = useAuth();
  const [likeState, setLikeState] = useState({
    likeCount: likes.length,
    isLiked: userId ? likes.includes(userId) : false,
  });

  const [optimisticLike, switchOptimisticLike] = useOptimistic(
    likeState,
    (state, value) => {
      return {
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      };
    }
  );

  const likeAction = async () => {
    switchOptimisticLike("");
    try {
      switchLike(postId);
      setLikeState((state) => ({
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      }));
    } catch (err) {}
  };
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      gap={3}
      sx={{ my: 3 }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={3}
        sx={{ bgcolor: "#f1f5f9", borderRadius: 2,padding:1}}
      >
        <FormControl component="form" action={likeAction}>
          <button>
          {optimisticLike.isLiked ? <IconThumbUpFilled /> : <IconThumbUp />}
          </button>
        </FormControl>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Typography variant="body1" color="textSecondary">
          {optimisticLike.likeCount}
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{ display: { xs: "none", sm: "none", md: "inline" } }}
          >
            {" "}
            Likes
          </Typography>
        </Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={3}
        sx={{ bgcolor: "#f1f5f9", borderRadius: 2, padding: 1 }}
      >
        <IconMessage />
        <Divider orientation="vertical" variant="middle" flexItem />
        <Typography variant="body1" color="textSecondary">
          {commentNumber}
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{ display: { xs: "none", sm: "none", md: "inline" } }}
          >
            {" "}
            Comments
          </Typography>
        </Typography>
      </Stack>

      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={3}
        sx={{ bgcolor: "#f1f5f9", borderRadius: 2, padding: 1 }}
      >
        <IconShare />
        <Divider orientation="vertical" variant="middle" flexItem />
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ display: { xs: "none", sm: "none", md: "inline" } }}
        >
          Share
        </Typography>
      </Stack>
    </Stack>
  );
}
