import { Box } from "@mui/material";
import Header from "./header";
import Main from "./main";
import Nav from "./nav";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function DashboardLayout({ children, navConfig }) {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        <Nav
          openNav={openNav}
          onCloseNav={() => setOpenNav(false)}
          navConfig={navConfig}
        />

        <Main>
          <Outlet />
        </Main>
      </Box>
    </>
  );
}

