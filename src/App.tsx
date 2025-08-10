import { Admin, CustomRoutes, Resource } from "react-admin";
import { dataProvider } from "./dataProvider";
import { UserList } from "./User/List.tsx";
import { UserEdit } from "./User/Edit.tsx";
import { authProvider } from "./authProvider";
import LoginPage from "./Auth/LoginPage.tsx";
import ForgotPasswordPage from "./Auth/ForgotPasswordPage.tsx";
import ResetPasswordPage from "./Auth/ResetPasswordPage.tsx";
import ChangePasswordPage from "./Auth/ChangePasswordPage.tsx";
import { Route } from "react-router";
import { MyLayout } from "./User/MyLayout.tsx";
import ProfilPage from "./User/ProfilPage.tsx";

export const App = () => (
  <Admin
    loginPage={LoginPage}
    dataProvider={dataProvider}
    authProvider={authProvider}
    layout={MyLayout}
  >
    <Resource name="user" list={UserList} edit={UserEdit} />
    <CustomRoutes>
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/change-password" element={<ChangePasswordPage />} />
      <Route path="/profil" element={<ProfilPage />} />
    </CustomRoutes>
  </Admin>
);
