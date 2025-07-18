import { Box, TextField, Button, Typography } from "@mui/material";
import { fetchUtils, useNotify } from "react-admin";
import { useState } from "react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const notify = useNotify();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const API_URL = import.meta.env.VITE_JSON_SERVER_URL;
    const data = { email };

    try {
      const response = await fetchUtils.fetchJson(
        `${API_URL}/auth/forgot-password`,
        {
          method: "POST",
          body: JSON.stringify(data),
        },
      );

      notify(response.json.message, {
        type: response.json.error ? "error" : "success",
      });
    } catch (error) {
      notify(error.message, { type: "error" });
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h5" mb={2}>
        Resetuj hasło
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          fullWidth
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Resetuj hasło
        </Button>
      </form>
    </Box>
  );
};

export default ForgotPasswordPage;
