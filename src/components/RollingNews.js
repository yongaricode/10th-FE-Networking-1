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

  // 뉴스 각 항목에 대해 li태그를 만들기 위해 ForEach 대신 map 사용.
  const newsListItems = news
    .map((newsItem, idx) => {
      let className = "";
      if (idx === 0) {
        className = "current";
      } else if (idx === 1) {
        className = "next";
      } else if (idx === news.length - 1) {
        className = "prev";
      }

      return `<li class="news-title ${className}"><a class="news-a">${newsItem}</a></li>`;
    })
    // join을 사용해 반환된 li 태그들을 붙여 문자열로 만듦.
    .join("");

  const wrapper = document.createElement("div");
  wrapper.id = "wrapper";
  wrapper.innerHTML = `<ul>${newsListItems}</ul>`;

  createRollingNews.appendChild(wrapper);

  return createRollingNews;
}

export default RollingNews;
