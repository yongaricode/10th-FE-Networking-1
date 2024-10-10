import createCategoryBar from "./components/categoryBar.js";
import header from "./components/Header.js";
import rollingNews from "./components/RollingNews.js";
import PressNews from "./components/PressNews.js";
import tabBar from "./components/TabBar.js";

export const index = () => {
  const app = document.getElementById("app");
  const categoryBar = createCategoryBar();

  app.innerHTML = `
    ${header().outerHTML}
    <div id="news-container">
      ${rollingNews().outerHTML}
      ${rollingNews().outerHTML}
    </div>
    ${tabBar().outerHTML}
    <div id="news-list">
      ${PressNews().outerHTML}
    </div>
  `;

  app.querySelector("#news-list").appendChild(categoryBar);
};

index();
