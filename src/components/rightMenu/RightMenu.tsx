import React, { Suspense } from "react";
import Birthdays from "./Birthdays";
import Ad from "../Ad";
import UserInfoCard from "./UserInfoCard";
import UserMediaCard from "./UserMediaCard";
import { User } from "@prisma/client";
import FollowerInfo from "./FollowerInfo";

export default function RightMenu({ user }: { user?: User }) {
  return (
    <div className="flex flex-col gap-6">
      {user ? (
        <>
          <Suspense fallback="loading...">
            <UserInfoCard user={user} />
          </Suspense>
          <Suspense fallback="loading...">
            <UserMediaCard user={user} />
          </Suspense>
        </>
      ) : null}
      <FollowerInfo />
      <Birthdays />
      <Ad size="md" />
    </div>
  );
}
