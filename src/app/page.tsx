import AddPost from "@/components/feed/AddPost";
import Feed from "@/components/feed/Feed";
import LeftMenu from "@/components/leftMenu/LeftMenu";
import RightMenu from "@/components/rightMenu/RightMenu";
import { Box, Stack } from "@mui/material";

const Homepage = () => {
  return (
    <div className="flex gap-6 pt-6">
      <Box
        sx={{
          display: { xs: "none", sm: "none", md: "none", lg: "block" },
          width: "20%",
        }}
      >
        <LeftMenu type="home" />
      </Box>

      <Stack
        direction="column"
        spacing={4}
        sx={{
          width: { xs: "100%", sm: "100%", md: "100%", lg: "70%", xl: "50%" },
        }}
      >        
        <AddPost />
        <Feed />
      </Stack>

      <div className="hidden lg:block w-[30%]">
        <RightMenu />
      </div>
    </div>
  );
};

export default Homepage;
