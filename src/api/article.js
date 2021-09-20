import api from "./index";

const Article = {
  // Good practice is to use destructuring for objects and define that receive in the object
  create: (data) => {
    return api.post("/articles", data);
  },
};

export default Article;
