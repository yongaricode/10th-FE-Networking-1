import createCategoryBar from "./components/categoryBar.js";
import header from "./components/Header.js";
import RollingNews from "./components/RollingNews.js";
import PressNews from "./components/PressNews.js";
import MyPressNews from "./components/MyPressNews.js";
import GridNews from "./components/GridNews.js";
import MyGridNews from "./components/MyGridNews.js";
import TabBar from "./components/TabBar.js";
import { createElement } from "./utils/createElement.js";

export const index = async () => {
  const app = document.getElementById("app");
  const rollingnews1 = await RollingNews(0);
  const rollingnews2 = await RollingNews(1000);

  app.innerHTML = `${header().outerHTML}
    <div id="news-container">
    </div>
    <div id='tab-bar'></div>
    <div id="news-list-container">
      <div id="news-list">
      </div>
    </div>`;

  app.querySelector("#news-container").appendChild(rollingnews1);
  app.querySelector("#news-container").appendChild(rollingnews2);

  const leftButton = createElement("", "left-button", "img");
  leftButton.src = "/src/assets/images/leftButton.png";

  const rightButton = createElement("", "right-button", "img");
  rightButton.src = "/src/assets/images/rightButton.png";

  // `news-list-container`에 버튼과 뉴스 리스트 추가
  const newsListContainer = app.querySelector("#news-list-container");
  newsListContainer.appendChild(leftButton);
  newsListContainer.appendChild(app.querySelector("#news-list"));
  newsListContainer.appendChild(rightButton);

  function renderNewsList(pressType, displayType) {
    const newsList = app.querySelector("#news-list");
    newsList.innerHTML = "";

    if (pressType === "total" && displayType === "list") {
      const categoryBar = createCategoryBar(pressType);
      newsList.appendChild(categoryBar);
      newsList.appendChild(PressNews());
    } else if (pressType === "my" && displayType === "list") {
      const categoryBar = createCategoryBar(pressType);
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
