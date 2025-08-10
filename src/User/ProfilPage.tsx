import { Box, Button, Typography, TextField } from "@mui/material";
import React, { useState } from "react";
import { fetchUtils, useNotify } from "react-admin";
import * as helpers from "../helpers.ts";

const API_URL = import.meta.env.VITE_JSON_SERVER_URL;
const id = localStorage.getItem("id");
const options = {
  method: "GET",
};
const response = await fetchUtils.fetchJson(
  `${API_URL}/profil/getUserInfo/${id}`,
  Object.assign(options, helpers.setToken()),
);

const ProfilPage = () => {
  const notify = useNotify();
  const [firstname, setFirstName] = useState(response.json.info.firstname);
  const [lastname, setLastName] = useState(response.json.info.lastname);
  const [street, setStreet] = useState(response.json.info.street);
  const [city, setCity] = useState(response.json.info.city);
  const [postcode, setPostcode] = useState(response.json.info.postcode);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = {
      info: {
        firstname,
        lastname,
        street,
        city,
        postcode,
      },
    };

    try {
      const options = {
        method: "POST",
        body: JSON.stringify(data),
      };
      const response = await fetchUtils.fetchJson(
        `${API_URL}/profil/${id}`,
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
        Edytuj profil
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          value={firstname}
          onChange={(e) => setFirstName(e.target.value)}
          label="First Name"
          type="text"
          fullWidth
          margin="normal"
        />
        <TextField
          value={lastname}
          onChange={(e) => setLastName(e.target.value)}
          label="Last Name"
          type="text"
          fullWidth
          margin="normal"
        />
        <TextField
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          label="Street"
          type="text"
          fullWidth
          margin="normal"
        />
        <TextField
          value={city}
          onChange={(e) => setCity(e.target.value)}
          label="City"
          type="text"
          fullWidth
          margin="normal"
        />
        <TextField
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          label="Post Code"
          type="text"
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Zapisz
        </Button>
      </form>
    </Box>
  );
};

export default ProfilPage;
