"use client";

import { deletePost } from "@/lib/action";
import { Button, FormControl, IconButton, Menu, MenuItem } from "@mui/material";
import { IconDots } from "@tabler/icons-react";
import { useState } from "react";

const PostInfo = ({ postId }: { postId: number }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deletePostWithId = deletePost.bind(null, postId);
  return (
    <div>
      <IconButton
        id="more-button"
        aria-controls={open ? "more" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <IconDots />
      </IconButton>
      <Menu
        id="more"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "more-button",
        }}
      >
        <MenuItem onClick={handleClose}>View</MenuItem>
        <MenuItem onClick={handleClose}>Re-post</MenuItem>
        <MenuItem>
        <FormControl component="form" action={deletePostWithId}>
        <Button size="small" variant="text" disableElevation color="error" type="submit">
          Delete
        </Button>
        </FormControl>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default PostInfo;
