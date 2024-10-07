import { createElement } from "../utils/createElement.js";

function RollingNews() {
  const createRollingNews = document.createElement("div");
  createRollingNews.id = "rolling-news";

  const news = [
    "노바백스 백신 2월중순부터 접종",
    "얼어붙은 투심에…현대엔지니어링 상장 철회",
    "공법변경 구조검토 요구, 현산 측이 묵살했다",
    "일본 정부, 사도광산 세계유산 추천 방침 굳혀, 일본과 갈등 첨예화 예상",
    "12월 주담대 금리 연 3.63%…7년7개월 만에 최고",
  ];

  const wrapper = document.createElement("div");
  wrapper.id = "wrapper";

  const newsList = document.createElement("ul");

  news.forEach((newsItem, idx) => {
    const newsTitle = createElement("", "news-title", "li");
    const a = createElement(newsItem, "news-a", "a");

    newsTitle.appendChild(a);

    if (idx === 0) {
      newsTitle.classList.add("current");
    } else if (idx === 1) {
      newsTitle.classList.add("next");
    } else if (idx === news.length - 1) {
      newsTitle.classList.add("prev");
    }

    newsList.appendChild(newsTitle);
  });

  wrapper.appendChild(newsList);
  createRollingNews.appendChild(wrapper);

  return createRollingNews;
}

export default RollingNews;
