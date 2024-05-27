/* eslint-disable */

import { Button, Dialog, Stack, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

import Iconify from "../components/Iconfiy";

function SelectType({ type, setType }) {
  const theme = useTheme();
  return (
    <>
      <Dialog open={!type} maxWidth={"lg"} fullWidth>
        <Stack
          direction="row"
          spacing={2}
          alignContent={"center"}
          justifyContent={"center"}
          height={"10rem"}
          display={"flex"}
          margin={5}
        >
          <Button
            fullWidth
            size="large"
            color="inherit"
            variant="outlined"
            sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            onClick={() => setType("doctor")}
          >
            <Stack direction="column" alignItems={"center"} spacing={1}>
              <Iconify
                icon="hugeicons:doctor-01"
                sx={{ color: "#1877f2", width: "4rem", height: "4rem" }}
              />
              <Typography variant="bold" color={"#1877f2"} >Doktor</Typography>
            </Stack>
          </Button>

          <Button
            fullWidth
            size="large"
            color="inherit"
            variant="outlined"
            sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            onClick={() => setType("patient")}
          >
            <Stack direction="column" alignItems={"center"} spacing={1}>
              <Iconify
                icon="fluent:person-pill-20-regular"
                sx={{ color: "#1877f2", width: "4rem", height: "4rem" }}
              />
              <Typography variant="bold" color={"#1877f2"} >Hasta</Typography>
            </Stack>
          </Button>
          <Button
            fullWidth
            size="large"
            color="inherit"
            variant="outlined"
            sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            onClick={() => setType("admin")}
          >
            <Stack direction="column" alignItems={"center"} spacing={1}>
              <Iconify
                icon="eos-icons:admin"
                sx={{ color: "#1877f2", width: "4rem", height: "4rem" }}
              />
              <Typography variant="bold" color={"#1877f2"} >Admin</Typography>
            </Stack>
          </Button>
        </Stack>
      </Dialog>
    </>
  );
}

export default SelectType;

