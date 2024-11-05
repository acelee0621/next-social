import { Avatar, Button, CardContent, Stack, Typography } from "@mui/material";
import { User } from "@prisma/client";
import Link from "next/link";

export default function FollowerList({ follower }: { follower: User[] }) {
  return (
    <CardContent sx={{ px: 2 }}>
      <Stack direction="column" justifyContent="space-between" gap={2}>
        {follower?.map((item) => (
          <Stack direction="row" justifyContent="space-between" key={item.id}>
            <Stack direction="row" gap={2} alignItems="center">
              <Avatar
                alt={item.username}
                src={item.avatar || "/noAvatar.png"}
                sx={{ width: 40, height: 40 }}
              />
              <Typography
                variant="body1"
                color="textSecondary"
                fontWeight={500}
              >
                {item.name && item.surname
                  ? item.name + " " + item.surname
                  : "@" + item.username}
              </Typography>
            </Stack>
            <Button size="small" variant="text" sx={{ justifySelf: "end" }}>
              <Link href={`/profile/${item.username}`}>see profile</Link>
            </Button>
          </Stack>
        ))}
      </Stack>
    </CardContent>
  );
}
