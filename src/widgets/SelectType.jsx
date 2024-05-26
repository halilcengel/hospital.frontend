/* eslint-disable */

import { Button, Dialog, DialogTitle, Stack } from "@mui/material";
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
            <Iconify icon="hugeicons:doctor-01" />
          </Button>

          <Button
            fullWidth
            size="large"
            color="inherit"
            variant="outlined"
            sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            onClick={() => setType("patient")}

          >
            <Iconify icon="fluent:person-pill-20-regular" />
          </Button>
        </Stack>
      </Dialog>
    </>
  );
}

export default SelectType;

