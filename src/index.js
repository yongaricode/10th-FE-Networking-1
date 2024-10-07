import createCategoryBar from "./components/categoryBar.js";
import header from "./components/Header.js";
import rollingNews from "./components/RollingNews.js";
import PressNews from "./components/PressNews.js";

export const index = () => {
  const app = document.getElementById("app");

  app.appendChild(header());

  const newsContainer = document.createElement("div");
  newsContainer.id = "news-container";

  newsContainer.appendChild(rollingNews());
  newsContainer.appendChild(rollingNews());

  app.appendChild(newsContainer);

  const newsList = document.createElement("div");
  newsList.id = "news-list";

  newsList.appendChild(createCategoryBar());
  newsList.appendChild(PressNews());

  app.appendChild(newsList);
};

index();
