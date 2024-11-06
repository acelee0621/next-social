import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { IconDots } from "@tabler/icons-react";


const Ad = ({ size }: { size: "sm" | "md" | "lg" }) => {
  return (
    <Card raised sx={{ borderRadius: 1.5 }}>
      {/* TOP */}
      <CardHeader      
        disableTypography
        subheader={
          <Typography variant={size === "sm" ? "caption" : "body2"} color="textSecondary">
            Sponsored Ads
          </Typography>
        }
        action={
          <IconButton aria-label="settings" size="small">
            <IconDots />
          </IconButton>
        }        
      />
      <CardMedia
        component="img"
        height={`${size === "sm" ? "6rem" : size === "md" ? "9rem" : "12rem"}`}
        image="https://images.pexels.com/photos/23193135/pexels-photo-23193135.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
        alt="ad"        
      />
      {/* BOTTOM */}
      <CardContent>
        <Stack direction="row" alignItems="center" gap={2}>          
          <Avatar
          alt="ad"
          src="https://images.pexels.com/photos/23193135/pexels-photo-23193135.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
          sx={{ width: 24, height: 24}}
        />
          <Typography variant="body1" color="primary">BigChef Lounge</Typography>
        </Stack>
        <Typography variant={size === "sm" ? "caption" : "body2"}>
          {size === "sm"
            ? "Lorem ipsum dolor sit amet consectetur adipisicing elit."
            : size === "md"
            ? "Lorem ipsum dolor sit amet consectetur adipisicing elit.  Lorem ipsum dolor sit amet consectetur adipisicing elit."
            : "Lorem ipsum dolor sit amet consectetur adipisicing elit.  Lorem ipsum dolor sit amet consectetur adipisicing elit.  Lorem ipsum dolor sit amet consectetur adipisicing elit."}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "end" }}>
        <Button size="small" variant="text">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default Ad;
