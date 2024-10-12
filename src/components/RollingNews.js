function RollingNews() {
  const createRollingNews = document.createElement("div");
  createRollingNews.id = "rolling-news";

  const news = [];
  const rollingTime = 5000;
  const rollingInterval = 1000;

  function getHeadline() {
    const dataPath = "/src/data/headline.json";

    fetch(dataPath)
      .then((response) => {
        if (!response.ok) {
          throw new Error("네트워크 에러");
        }
        return response.json();
      })
      .then((data) => {
        data.forEach((headline) => {
          news.push(headline);
        });
        renderNews();
        initializeRolling();
      })
      .catch((error) => console.error("로딩 에러: ", error));
  }

  // 함수 호출
  getHeadline();

  function renderNews() {
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

        return `<li class="news-title ${className}"><a class="news-a">${newsItem.headline}</a></li>`;
      })
      // join을 사용해 반환된 li 태그들을 붙여 문자열로 만듦.
      .join("");

    const wrapper = document.createElement("div");
    wrapper.id = "wrapper";
    wrapper.innerHTML = ` <div id='container'>
      <h3 id='media-name'>연합뉴스</h3>
      <ul>${newsListItems}</ul>
    </div>`;

    createRollingNews.appendChild(wrapper);
  }

  function initializeRolling() {
    const rollingElements = document.querySelectorAll("#rolling-news");
    if (rollingElements[0]) {
      setInterval(() => rollingCallback(rollingElements[0]), rollingTime);
    }

    // 2번째 뉴스 바는 1초 뒤부터 돌아가도록 설정
    if (rollingElements[1]) {
      setTimeout(() => {
        setInterval(() => rollingCallback(rollingElements[1]), rollingTime);
      }, rollingInterval);
    }
  }

  function rollingCallback(rollingBar) {
    const current = rollingBar.querySelector(".current");
    const prev = rollingBar.querySelector(".prev");
    const next = rollingBar.querySelector(".next");

    // prev 삭제
    prev.classList.remove("prev");

    // current -> prev
    current.classList.remove("current");
    current.classList.add("prev");

    // next -> current
    if (next.nextElementSibling) {
      next.nextElementSibling.classList.add("next");
    } else {
      rollingBar.querySelector("ul li:first-child").classList.add("next");
    }
    next.classList.remove("next");
    next.classList.add("current");
  }

  return createRollingNews;
}

export default RollingNews;
