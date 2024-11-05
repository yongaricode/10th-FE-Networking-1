import { createElement } from "../utils/createElement.js";

function PressNews() {
  const pressNews = document.createElement("div");
  pressNews.id = "press-news";

  let current;

  function testFetchJSON() {
    const dataPath = "/src/data/news.json";

    fetch(dataPath)
      .then((response) => {
        if (!response.ok) {
          throw new Error("에러");
        }
        return response.json();
      })
      .then((data) => {
        current = data[Object.keys(data)[0]];
        console.log(current);

        loadMainNews();
      })
      .catch((error) => console.error("Error loading JSON:", error));
  }

  // 함수 호출
  testFetchJSON();

  function loadMainNews() {
    const pressInfo = document.createElement("div");
    pressInfo.id = "press-info";

    const mediaLogo = createElement("", "media-logo", "img");
    mediaLogo.src = current.logoLight;
    pressInfo.appendChild(mediaLogo);

    const editTime = createElement(current.time, "time", "span");
    pressInfo.appendChild(editTime);

    pressNews.appendChild(pressInfo);

    const News = document.createElement("div");
    News.id = "news";
    const Main = document.createElement("div");
    Main.id = "main";
    const Sub = document.createElement("div");
    Sub.id = "sub";

    News.appendChild(Main);

    const thumbNail = createElement("", "mainImg", "img");
    thumbNail.src = current.mainImg;
    Main.appendChild(thumbNail);

    const title = createElement(current.mainTitle, "mainTitle", "span");
    Main.appendChild(title);

    const subtitleList = document.createElement("ul");

    current.relatedArticles.forEach((subtitle) => {
      const listItem = document.createElement("li");
      listItem.className = "subtitle";
      listItem.textContent = subtitle.title;
      subtitleList.appendChild(listItem);
    });

    const caption = createElement(
      `${current.mediaName} 언론사에서 직접 편집한 뉴스입니다.`,
      "caption",
      "span"
    );

    Sub.appendChild(subtitleList);
    Sub.appendChild(caption);
    News.appendChild(Sub);
    pressNews.appendChild(News);
  }

  return pressNews;
}

export default PressNews;
