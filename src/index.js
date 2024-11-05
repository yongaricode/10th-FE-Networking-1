import createCategoryBar from "./components/categoryBar.js";
import header from "./components/Header.js";
import RollingNews from "./components/RollingNews.js";
import PressNews from "./components/PressNews.js";
import MyPressNews from "./components/MyPressNews.js";
import GridNews from "./components/GridNews.js";
import MyGridNews from "./components/MyGridNews.js";
import TabBar from "./components/TabBar.js";

export const index = async () => {
  const app = document.getElementById("app");
  const categoryBar = createCategoryBar();
  const rollingnews1 = await RollingNews(0);
  const rollingnews2 = await RollingNews(1000);

  app.innerHTML = `${header().outerHTML}
    <div id="news-container">
    </div>
    <div id='tab-bar'></div>
    <div id="news-list">
    </div>`;

  app.querySelector("#news-container").appendChild(rollingnews1);
  app.querySelector("#news-container").appendChild(rollingnews2);

  function renderNewsList(pressType, displayType) {
    const newsList = app.querySelector("#news-list");
    newsList.innerHTML = "";

    if (pressType === "total" && displayType === "list") {
      newsList.appendChild(categoryBar);
      newsList.appendChild(PressNews());
    } else if (pressType === "my" && displayType === "list") {
      newsList.appendChild(categoryBar);
      newsList.appendChild(MyPressNews());
    } else if (pressType === "total" && displayType === "grid") {
      newsList.appendChild(GridNews());
    } else if (pressType === "my" && displayType === "grid") {
      newsList.appendChild(MyGridNews());
    }
  }

  const tabbar = TabBar(renderNewsList);
  app.querySelector("#tab-bar").appendChild(tabbar);

  renderNewsList("total", "list");
};

index();
