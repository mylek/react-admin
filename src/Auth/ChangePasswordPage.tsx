import { Box, Button, Typography, TextField } from "@mui/material";
import { fetchUtils, useNotify } from "react-admin";
import React, { useState } from "react";
import * as helpers from "../helpers.ts";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [passwordReplace, setPasswordReplace] = useState("");
  const notify = useNotify();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== passwordReplace) {
      notify("Hasła nie są takie same.", { type: "error" });
      return;
    }

    const API_URL = import.meta.env.VITE_JSON_SERVER_URL;
    const data = { password };

    try {
      const options = {
        method: "POST",
        body: JSON.stringify(data),
      };
      const response = await fetchUtils.fetchJson(
        `${API_URL}/user/change-my-password`,
        Object.assign(options, helpers.setToken()),
      );
      notify(response.json.message, {
        type: response.json.error ? "error" : "success",
      });
    } catch (error) {
      if (error instanceof Error) {
        notify(error.message, { type: "error" });
      } else {
        notify("Wystąpił nieznany błąd.", { type: "error" });
      }
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
        Zmien hasło
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Haslo"
          type="password"
          fullWidth
          margin="normal"
        />
        <TextField
          value={passwordReplace}
          onChange={(e) => setPasswordReplace(e.target.value)}
          label="Powtórz haslo"
          type="password"
          fullWidth
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Zmien hasło
        </Button>
      </form>
    </Box>
  );
};

export default ResetPasswordPage;
