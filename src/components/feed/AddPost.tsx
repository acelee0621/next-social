"use client";

import { useUser } from "@clerk/nextjs";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { addPost } from "@/lib/action";
import AddPostButton from "../AddPostButton";
import {
  Avatar,  
  Card,
  CardContent,
  FormControl,
  Stack,  
  TextField,
} from "@mui/material";
import Loading from "@/app/loading";

const AddPost = () => {
  const { user, isLoaded } = useUser();
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState<any>();

  if (!isLoaded) {
    return <Loading/>;
  }

  return (
    <Card raised sx={{ borderRadius: 1.5 }}>
      <CardContent>
        <Stack direction="row" gap={2} sx={{width:"100%"}}>
          {/* AVATAR */}
          <Avatar
            alt="avatar"
            src={user?.imageUrl || "/noAvatar.png"}
            sx={{ width: 48, height: 48}}
          />
          {/* POST */}
          <Stack direction="column" alignItems="center" gap={2}>
            {/* TEXT INPUT */}
            <FormControl
              component="form"
              fullWidth
              action={(formData) => addPost(formData, img?.secure_url || "")}
            >
             
              <TextField
                multiline
                minRows="3"
                variant="outlined"
                id="desc"
                placeholder="What's on your mind?"
                name="desc"
                onChange={(e) => setDesc(e.target.value)}
                sx={{ bgcolor: "#f1f5f9",mb:3}}
              />
              <AddPostButton />
             
            </FormControl>
            {/* POST OPTIONS */}
            <Stack direction="row" justifyContent="space-between" gap={8}>
              <CldUploadWidget
                uploadPreset="social"
                onSuccess={(result, { widget }) => {
                  setImg(result.info);
                  widget.close();
                }}
              >
                {({ open }) => {
                  return (
                    <Stack
                      direction="row"
                      gap={1}
                      sx={{ "&:hover": { cursor: "pointer" } }}
                      onClick={() => open()}
                    >
                      <Image
                        src="/addimage.png"
                        alt=""
                        width={20}
                        height={20}
                      />
                      Photo
                    </Stack>
                  );
                }}
              </CldUploadWidget>
              <Stack
                direction="row"
                gap={1}
                sx={{ "&:hover": { cursor: "pointer" } }}
              >
                <Image src="/addVideo.png" alt="" width={20} height={20} />
                Video
              </Stack>
              <Stack
                direction="row"
                gap={1}
                sx={{ "&:hover": { cursor: "pointer" } }}
              >
                <Image src="/poll.png" alt="" width={20} height={20} />
                Poll
              </Stack>
              <Stack
                direction="row"
                gap={1}
                sx={{ "&:hover": { cursor: "pointer" } }}
              >
                <Image src="/addevent.png" alt="" width={20} height={20} />
                Event
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default AddPost;
