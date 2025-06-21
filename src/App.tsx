import {
  Admin,
  Resource
} from "react-admin";
import { dataProvider } from "./dataProvider";
import { UserList } from "./User/List.tsx";
import { UserEdit } from "./User/Edit.tsx";
import { authProvider } from "./authProvider";


export const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="user" list={UserList} edit={UserEdit}/>
  </Admin>
);
