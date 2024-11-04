"use client";

import { switchFollow } from "@/lib/action";
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
        <button className="w-full bg-blue-500 text-white text-sm rounded-md p-2">
          {optimisticState.following ? "Following" : "Follow"}
        </button>
      </form>
    </>
  );
};

export default UserInfoCardInteraction;
