import {
  SaveButton,
  Toolbar,
  SimpleForm,
  TextInput,
  Title,
  ImageInput,
  ImageField,
  fetchUtils,
  useNotify,
} from "react-admin";
import { Card } from "@mui/material";
import * as helpers from "../helpers.ts";
import { useState } from "react";

const API_URL = import.meta.env.VITE_JSON_SERVER_URL;
const id = localStorage.getItem("id");
const options = {
  method: "GET",
};
const response = await fetchUtils.fetchJson(
  `${API_URL}/profil/getUserInfo/${id}`,
  Object.assign(options, helpers.setToken()),
);

export const ProfilPage = () => {
  const notify = useNotify();
  const [firstname, setFirstName] = useState(response.json.info.firstname);
  const [lastname, setLastName] = useState(response.json.info.lastname);
  const [street, setStreet] = useState(response.json.info.street);
  const [city, setCity] = useState(response.json.info.city);
  const [postcode, setPostcode] = useState(response.json.info.postcode);

  const postSave = async (data) => {
    const base64: string = "";
    try {
      if (data.pictures !== undefined) {
        const base64: string = await fetch(data.pictures.src)
          .then((response) => response.blob())
          .then((blob) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            return new Promise((res) => {
              reader.onloadend = () => {
                res(reader.result);
              };
            });
          });
      }

      const formData = {
        info: {
          firstname,
          lastname,
          street,
          city,
          postcode,
        },
      };

      if (base64 !== "") {
        formData.image = {
          fileName: data.pictures.title,
          base64,
        };
      }

      const options = {
        method: "POST",
        body: JSON.stringify({
          formData,
        }),
      };

      const response = await fetchUtils.fetchJson(
        `${API_URL}/profil/${id}`,
        Object.assign(options, helpers.setToken()),
      );
      notify(response.json.message, {
        type: response.json.error ? "error" : "success",
      });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        notify(error.message, { type: "error" });
      } else {
        notify("Wystąpił nieznany błąd.", { type: "error" });
      }
    }
  };

  const record = {
    firstname,
    lastname,
    street,
    city,
    postcode,
  };

  const UserEditToolbar = (props) => (
    <Toolbar {...props}>
      <SaveButton alwaysEnable />
    </Toolbar>
  );

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Title title="Profil" />
      <Card
        sx={{
          mt: 10,
          width: "60%",
        }}
      >
        <SimpleForm
          record={record}
          toolbar={<UserEditToolbar />}
          onSubmit={postSave}
        >
          <TextInput
            source="firstname"
            fullWidth
            margin="normal"
            onChange={(e) => setFirstName(e.target.value)}
            label="First Name"
          />
          <TextInput
            source="lastname"
            fullWidth
            margin="normal"
            onChange={(e) => setLastName(e.target.value)}
            label="Last Name"
          />
          <TextInput
            source="street"
            fullWidth
            margin="normal"
            onChange={(e) => setStreet(e.target.value)}
            label="Street"
          />
          <TextInput
            source="city"
            fullWidth
            margin="normal"
            onChange={(e) => setCity(e.target.value)}
            label="City"
          />
          <TextInput
            source="postcode"
            fullWidth
            margin="normal"
            onChange={(e) => setPostcode(e.target.value)}
            label="Post Code"
          />
          <ImageInput source="pictures" label="Related pictures">
            <ImageField source="src" title="title" />
          </ImageInput>
        </SimpleForm>
      </Card>
    </div>
  );
};
