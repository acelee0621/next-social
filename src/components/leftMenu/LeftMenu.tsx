import Image from "next/image";
import Link from "next/link";
import React from "react";
import ProfileCard from "./ProfileCard";
import Ad from "../Ad";
import {
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";

export default function LeftMenu({ type }: { type: "home" | "profile" }) {
  return (
    <Stack direction="column" gap={4}>
      {type === "home" && <ProfileCard />}
      <Card raised sx={{ borderRadius: 1.5 }}>
        <CardContent sx={{ justifyContent: "center", color: "#4b5563" }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                component="a"
                href="/"
                sx={{ gap: 2, borderRadius: 1.5 }}
              >
                <Image src="/posts.png" alt="" width={20} height={20} />
                <ListItemText primary="My Posts" />
              </ListItemButton>
            </ListItem>
            <Divider sx={{ opacity: 0.6 }} variant="middle" flexItem />
            <ListItem disablePadding>
              <ListItemButton
                component="a"
                href="/"
                sx={{ gap: 2, borderRadius: 1.5 }}
              >
                <Image src="/activity.png" alt="" width={20} height={20} />
                <ListItemText primary="Activity" />
              </ListItemButton>
            </ListItem>
            <Divider sx={{ opacity: 0.6 }} variant="middle" flexItem />
            <ListItem disablePadding>
              <ListItemButton
                component="a"
                href="/"
                sx={{ gap: 2, borderRadius: 1.5 }}
              >
                <Image src="/market.png" alt="" width={20} height={20} />
                <ListItemText primary="Marketplace" />
              </ListItemButton>
            </ListItem>
            <Divider sx={{ opacity: 0.6 }} variant="middle" flexItem />
            <ListItem disablePadding>
              <ListItemButton
                component="a"
                href="/"
                sx={{ gap: 2, borderRadius: 1.5 }}
              >
                <Image src="/events.png" alt="" width={20} height={20} />
                <ListItemText primary="Events" />
              </ListItemButton>
            </ListItem>
            <Divider sx={{ opacity: 0.6 }} variant="middle" flexItem />
            <ListItem disablePadding>
              <ListItemButton
                component="a"
                href="/"
                sx={{ gap: 2, borderRadius: 1.5 }}
              >
                <Image src="/albums.png" alt="" width={20} height={20} />
                <ListItemText primary="Albums" />
              </ListItemButton>
            </ListItem>
            <Divider sx={{ opacity: 0.6 }} variant="middle" flexItem />
            <ListItem disablePadding>
              <ListItemButton
                component="a"
                href="/"
                sx={{ gap: 2, borderRadius: 1.5 }}
              >
                <Image src="/videos.png" alt="" width={20} height={20} />
                <ListItemText primary="Videos" />
              </ListItemButton>
            </ListItem>
            <Divider sx={{ opacity: 0.6 }} variant="middle" flexItem />
            <ListItem disablePadding>
              <ListItemButton
                component="a"
                href="/"
                sx={{ gap: 2, borderRadius: 1.5 }}
              >
                <Image src="/news.png" alt="" width={20} height={20} />
                <ListItemText primary="News" />
              </ListItemButton>
            </ListItem>
            <Divider sx={{ opacity: 0.6 }} variant="middle" flexItem />
            <ListItem disablePadding>
              <ListItemButton
                component="a"
                href="/"
                sx={{ gap: 2, borderRadius: 1.5 }}
              >
                <Image src="/courses.png" alt="" width={20} height={20} />
                <ListItemText primary="Courses" />
              </ListItemButton>
            </ListItem>
            <Divider sx={{ opacity: 0.6 }} variant="middle" flexItem />
            <ListItem disablePadding>
              <ListItemButton
                component="a"
                href="/"
                sx={{ gap: 2, borderRadius: 1.5 }}
              >
                <Image src="/lists.png" alt="" width={20} height={20} />
                <ListItemText primary="Lists" />
              </ListItemButton>
            </ListItem>
            <Divider sx={{ opacity: 0.6 }} variant="middle" flexItem />
            <ListItem disablePadding>
              <ListItemButton
                component="a"
                href="/"
                sx={{ gap: 2, borderRadius: 1.5 }}
              >
                <Image src="/settings.png" alt="" width={20} height={20} />
                <ListItemText primary="Settings" />
              </ListItemButton>
            </ListItem>
          </List>
        </CardContent>
      </Card>
      <Ad size="sm" />
    </Stack>
  );
}
