import { Box, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Login, LoginForm } from "react-admin";

const LoginPage = () => (
  <Login>
    <LoginForm />
    <Box textAlign="center" mb={1}>
      <Link component={RouterLink} to="/forgot-password">
        Forgot password?
      </Link>
      <Link component={RouterLink} to="/reset-password">
        Forgot password?
      </Link>
    </Box>
  </Login>
);

export default LoginPage;
