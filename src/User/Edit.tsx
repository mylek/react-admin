import { Edit, TabbedForm, TextInput, SelectInput, fetchUtils, regex } from 'react-admin';
import * as helpers from '../helpers.ts';

const API_URL = import.meta.env.VITE_JSON_SERVER_URL;
const response = await fetchUtils.fetchJson(
  `${API_URL}/role`
);
const validateZipCode = regex(/^\d{2}-\d{3}$/, 'Kod pocztowy musi być w formacie XX-XXX');
const validateNameUnique = async (enteredName, id) => {
  const response = await fetch(
    `${API_URL}/user/usernameexist/${enteredName}/${id}`,
    helpers.setToken()
  );

  const { error } = await response.json();
  return error;
};

const UsernameValidator = async (value, fields) => {
  if (!value) {
    return 'The age is required';
  }

  if (value.length < 3) {
    return 'Minimum chars is 3';
  }
  if (await validateNameUnique(value, fields.id)) {
    return 'Username already used';
  }
  return undefined;
};
export const UserEdit = () => (
  <Edit>
    <TabbedForm>
        <TabbedForm.Tab  label="user">
          <TextInput source="id" disabled />
          <TextInput source="email" disabled />
          <TextInput source="username" validate={UsernameValidator} />
          {helpers.isAdmin() &&
          <SelectInput source="role" choices={response.json} />
          }
        </TabbedForm.Tab>
        <TabbedForm.Tab label="info">
          <TextInput source="info.firstname" />
          <TextInput source="info.lastname" />
          <TextInput source="info.street" />
          <TextInput source="info.city" />
          <TextInput source="info.postcode" validate={validateZipCode} />
        </TabbedForm.Tab>
      </TabbedForm>
  </Edit>
);