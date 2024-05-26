import { alpha, useTheme } from "@mui/material/styles";

import {Box} from "@mui/material";
import Card from "@mui/material/Card";
import { Divider } from "@mui/material";
import Link from "@mui/material/Link";
import SelectType from "../widgets/SelectType";
import SignUpWidget from "../widgets/SignUpWidget";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { bgGradient } from "../theme/css";
import { useState } from "react";

export default function SignUp() {
  const [type, setType] = useState(null);
  const theme = useTheme();
  console.log(type);
  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: "/assets/background/overlay_4.jpg",
        }),
        height: 1,
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        {type === null ? (
          <SelectType type={type} setType={setType} />
        ) : (
          <Card
            sx={{
              p: 5,
              width: 1,
              maxWidth: 420,
            }}
          >
            <Typography variant="h4">Kayıt Ol</Typography>

            <Divider sx={{ mt: 2, mb: 5 }} />

            <SignUpWidget type={type} />
          </Card>
        )}
      </Stack>
    </Box>
  );
}

