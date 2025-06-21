import { DataProvider, fetchUtils } from "react-admin";
import * as helpers from './helpers.ts'

const API_URL = import.meta.env.VITE_JSON_SERVER_URL;

export const dataProvider: DataProvider = {
  getList: async  (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;

    const response = await fetchUtils.fetchJson(
      `${API_URL}/${resource}?page=${page}&limit=${perPage}&sort=${order}&field=${field}`,
      helpers.setToken()
    );
    return {
      data: response.json.list,
      total:response.json.total
    };
  },
  getOne: async (resource, params) => {
    const response = await fetchUtils.fetchJson(`${API_URL}/${resource}/${params.id}`, helpers.setToken());
    return { data: response.json };
  },
  update: async (resource, params) => {
    const options = {
      method: "PUT",
      body: JSON.stringify(params.data)
    };
    console.log(Object.assign(options, helpers.setToken()));
    const response = await fetchUtils.fetchJson(
      `${API_URL}/${resource}/${params.id}`,
      Object.assign(options, helpers.setToken())
    );
    return { data: response.json };
  },
  delete: async (resource, params) => {
    const options = {
      method: "DELETE"
    };
    const response = await fetchUtils.fetchJson(
      `${API_URL}/${resource}/${params.id}`,
      Object.assign(options, helpers.setToken())
    );
    return { data: response.json };
  },
  deleteMany: async (resource, params) => {
    const options = {
      method: "DELETE",
      body: JSON.stringify(params.ids)
    };
    const response = await fetchUtils.fetchJson(
      `${API_URL}/${resource}`,
      Object.assign(options, helpers.setToken())
    );
    return { data: response.json };
  }
};
