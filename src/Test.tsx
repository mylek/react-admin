import { EditBase, SaveButton, Toolbar, SimpleForm, TextInput, Title, Edit, ReferenceField,  } from "react-admin";
import { Card, CardContent, Container } from "@mui/material";

export const Test = () => {
  const record = {
    title: "aaaa"
  };

  const UserEditToolbar = props => (
    <Toolbar {...props} >
      <SaveButton />
    </Toolbar>
  );

  return (
    <div>
      <Title title="Book Edition" />
      <Card>
        <SimpleForm record={record} toolbar={<UserEditToolbar />}>
          <TextInput source="title" />
        </SimpleForm>
      </Card>
    </div>
  );
};