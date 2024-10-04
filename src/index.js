import createCategoryBar from "./components/categoryBar.js";
import header from "./components/Header.js";
import rollingNews from "./components/RollingNews.js";

export const index = () => {
  const app = document.getElementById("app");

  app.appendChild(header());

  app.appendChild(createCategoryBar());
};

index();
