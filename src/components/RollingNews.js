const RollingNews = async (delay) => {
  const createRollingNews = document.createElement("div");
  createRollingNews.id = "rolling-news";

  const news = [];
  const rollingTime = 5000;

  async function getHeadline() {
    const dataPath = "/src/data/headline.json";
    try {
      const response = await fetch(dataPath);
      if (!response.ok) {
        throw new Error("네트워크 에러");
      }
      const data = await response.json();
      data.forEach((headline) => {
        news.push(headline);
      });
      return news;
    } catch (error) {
      console.error("로딩 에러: ", error);
    }
  }

  function renderNews() {
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
      .join("");

    const wrapper = document.createElement("div");
    wrapper.id = "wrapper";
    wrapper.innerHTML = `<div id='container'>
      <h3 id='media-name'>연합뉴스</h3>
      <ul>${newsListItems}</ul>
    </div>`;

    createRollingNews.appendChild(wrapper);
  }

  function initializeRolling() {
    // 초기화 지연 시간 추가
    setTimeout(() => {
      setInterval(() => {
        rollingCallback(createRollingNews.querySelector("ul"));
      }, rollingTime);
    }, delay);
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

  // 데이터 불러오기 및 렌더링
  const data = await getHeadline();
  renderNews(data);
  initializeRolling();

  return createRollingNews;
};

export default RollingNews;
