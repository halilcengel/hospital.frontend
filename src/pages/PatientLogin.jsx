import { alpha, useTheme } from "@mui/material/styles";

import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import Link from "@mui/material/Link";
import Login from "../widgets/Login";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { bgGradient } from "../theme/css";

export default function LoginView() {
  const theme = useTheme();

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
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Giriş Yapın</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Hesabınız Yok mu ?
            <Link variant="subtitle2" sx={{ ml: 0.5 }} href="signup" >
              Kayıt Ol
            </Link>
          </Typography>

          <Login />
        </Card>
      </Stack>
    </Box>
  );
}

