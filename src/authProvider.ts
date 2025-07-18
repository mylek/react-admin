import * as helpers from "./helpers.ts";

export const authProvider = {
  async login({ username, password }: { username: string; password: string }) {
    const request = new Request(
      `${import.meta.env.VITE_JSON_SERVER_URL}/auth/login`,
      {
        method: "POST",
        body: JSON.stringify({ email: username, password }),
        headers: new Headers({ "Content-Type": "application/json" }),
      },
    );

    const response = await fetch(request);
    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const { token, role } = await response.json();

    helpers.setCookie("jwt", token, 1);
    localStorage.setItem("auth", JSON.stringify({ token }));
    localStorage.setItem("role", JSON.stringify(btoa(role)));
  },
  async logout() {
    localStorage.removeItem("auth");
    localStorage.removeItem("role");
  },
  async checkAuth() {
    const auth = localStorage.getItem("auth");
    if (!auth) {
      throw new Error("Not authenticated");
    }
  },
  getPermissions: async () => {
    // opcjonalnie: implementacja uprawnień
  },
  checkError: async () => {
    // checkError logic
    return Promise.resolve();
  },
};
