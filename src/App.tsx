import { Admin, CustomRoutes, Resource } from "react-admin";
import { dataProvider } from "./dataProvider";
import { UserList } from "./User/List.tsx";
import { UserEdit } from "./User/Edit.tsx";
import { authProvider } from "./authProvider";
import LoginPage from "./Auth/LoginPage.tsx";
import ForgotPasswordPage from "./Auth/ForgotPasswordPage.tsx";
import ResetPasswordPage from "./Auth/ResetPasswordPage.tsx";
import { Route } from "react-router";

export const App = () => (
  <Admin
    loginPage={LoginPage}
    dataProvider={dataProvider}
    authProvider={authProvider}
  >
    <Resource name="user" list={UserList} edit={UserEdit} />
    <CustomRoutes>
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
    </CustomRoutes>
  </Admin>
);
