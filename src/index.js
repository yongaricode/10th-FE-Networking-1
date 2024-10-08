import createCategoryBar from "./components/categoryBar.js";
import header from "./components/Header.js";
import rollingNews from "./components/RollingNews.js";
import PressNews from "./components/PressNews.js";

export const index = () => {
  const app = document.getElementById("app");

  app.innerHTML = `
    ${header().outerHTML}
    <div id="news-container">
      ${rollingNews().outerHTML}
      ${rollingNews().outerHTML}
    </div>
    <div id="news-list">
      ${createCategoryBar().outerHTML}
      ${PressNews().outerHTML}
    </div>
  `;
};

index();
