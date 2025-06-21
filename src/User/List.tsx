// in src/users.tsx
import { List, Datagrid, TextField, EmailField } from "react-admin";
import * as helpers from '../helpers.ts'


export const UserList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="username" />
      <EmailField source="email" />
      <TextField source="info.firstname" />
      <TextField source="info.lastname" />
      {helpers.isAdmin() &&
      <TextField source="role" />
      }
    </Datagrid>
  </List>
);
