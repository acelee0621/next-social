import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const Birthdays = () => {
  return (
    <Card raised sx={{ borderRadius: 1.5 }}>
      {/* TOP */}
      <CardHeader
        disableTypography
        title={
          <Typography variant="body1" color="textSecondary">
            Birthdays
          </Typography>
        }
      />
      {/* USER */}
      <CardContent sx={{ px: 2 }}>       
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{mb:2,px:1}}
            // gap={8}            
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              gap={2}
            >
              <Avatar
                alt="birthday"
                src="/profile/delba-de-oliveira.png"
                sx={{ width: 40, height: 40 }}
              />
              <Typography
                variant="body1"
                color="textSecondary"
                fontWeight={500}
              >
                Ace Lee
              </Typography>
            </Stack>            
              <Button
                variant="contained"
                size="small"
                sx={{ textTransform: "none" }}
              >
                Celebrate
              </Button>            
          </Stack>
          {/* UPCOMING */}
          <CardActionArea sx={{borderRadius:1.5,bgcolor:"#f1f5f9",padding:1}}>
            <Stack direction="row" alignItems="center" justifyContent="center" gap={2}>
              <Image src="/gift.png" alt="" width={24} height={24} />              
              <Link href="/">
                <Typography variant="body2" color="textSecondary" fontWeight={700} component="p">
                  Upcoming Birthdays
                </Typography>
                <Typography variant="caption" color="textSecondary" component="p">
                  See other 16 have upcoming birthdays
                </Typography>
              </Link>              
            </Stack>
          </CardActionArea>        
      </CardContent>
    </Card>
  );
};

export default Birthdays;
