import api from "./index";

// Service
const User = {
  register: (userData) => {
    return api.post("/register", {
      ...userData,
      role: userData.role,
    });
  },
};

export default User;
