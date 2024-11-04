import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Box } from "@mui/material";

export const metadata: Metadata = {
  title: "Social Media App",
  description: "Social media app built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>        
          {/* <div className="w-full bg-white px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64"> */}
          <Navbar />          
          {/* </div> */}
          <Box
            sx={{
              px: { sm: 4, md: 8, lg: 16, xl: 32, xxl: 64 },
              bgcolor: "#f1f5f9",
            }}
          >
            {children}
          </Box>
        </body>
      </html>
    </ClerkProvider>
  );
}
