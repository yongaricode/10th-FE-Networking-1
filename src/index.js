import createCategoryBar from "./components/categoryBar.js";
import header from "./components/Header.js";
import RollingNews from "./components/RollingNews.js";
import PressNews from "./components/PressNews.js";
import tabBar from "./components/TabBar.js";

export const index = () => {
  const app = document.getElementById("app");
  const categoryBar = createCategoryBar();
  const tabbar = tabBar();
  const pressnews = PressNews();
  const rollingnews1 = RollingNews();
  const rollingnews2 = RollingNews();

  app.innerHTML = `
    ${header().outerHTML}
    <div id="news-container">
    </div>
    <div id='tab-bar'></div>
    <div id="news-list">
    </div>
  `;

  app.querySelector("#news-container").appendChild(rollingnews1);
  app.querySelector("#news-container").appendChild(rollingnews2);
  app.querySelector("#tab-bar").appendChild(tabbar);
  app.querySelector("#news-list").appendChild(categoryBar);
  app.querySelector("#news-list").append(pressnews);
};

index();
