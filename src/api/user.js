import api from "./index";

// Services
const User = {
  register: (userData) => {
    return api.post("/register", {
      ...userData,
      role: userData.role,
    });
  },
  login: (data) => {
    return api.post("/login", data);
  },
  logout: () => {
    return api.post("/logout"); // Pending
  },
  sendPasswordResetEmail: (email) => {
    return api.post("/forgot-password", { email }); // Pending
  },
  // Pending
  confirmPasswordReset: ({ email, password, password_confirmation, token }) => {
    return api.post("/reset-password", {
      email,
      password,
      password_confirmation,
      token,
    });
  },
  getAuthenticatedUser: () => {
    return api.get("/user");
  },
};

export default User;
