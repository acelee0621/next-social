"use client";

import { switchFollow } from "@/lib/action";
import { Button } from "@mui/material";
import { useOptimistic, useState } from "react";

const UserInfoCardInteraction = ({
  userId,
  isFollowing,
}: {
  userId: string;  
  isFollowing: boolean;
}) => {
  const [userState, setUserState] = useState({
    following: isFollowing,
  });

  const follow = async () => {
    switchOptimisticState(true);
    try {
      await switchFollow(userId);
      setUserState((prev) => ({
        ...prev,
        following: !prev.following,
      }));
    } catch (err) {}
  };

  const [optimisticState, switchOptimisticState] = useOptimistic(
    userState,
    (state) => {
      return {
        ...state,
        following: !state.following,
      };
    }
  );
  return (
    <>
      <form action={follow}>
        <Button variant="contained" fullWidth >
          {optimisticState.following ? "Following" : "Follow"}
        </Button>
      </form>
    </>
  );
};

export default UserInfoCardInteraction;
