import { createElement } from "../utils/createElement.js";

// 일단 props로 타입 판단을 하자...
// 전체 카테고리 -> categories 넘거주면됨... 길이는? 어떻게 하지... 배열 길이...?
// 내가 구독한 언론사 -> 따로 배열 만들어서 주자... 이것도 외부에서 넘겨줘야되나...?

async function fetchNewsData() {
  const response = await fetch("/src/data/news.json");
  const data = await response.json();
  return data;
}

function CreateCategoryBar(type) {
  const categoryBar = document.createElement("div");
  categoryBar.id = "category-bar";

  const categories = [
    "종합/경제",
    "방송/통신",
    "IT",
    "영자지",
    "스포츠/연예",
    "매거진/전문지",
    "지역",
  ];

  const myPress = ["연합신문", "SBS 비즈", "서울경제", "시사인", "중앙일보"];

  let selectedCategory = null;
  let currentPage = 1;

  function onClickCategory(categorySection, type, totalPage) {
    // 이전 선택된 카테고리 초기화
    if (selectedCategory && selectedCategory !== categorySection) {
      selectedCategory.classList.remove("selected-category");
      selectedCategory.querySelector(".current-page")?.remove(); // Optional chaining 추가
    }

    // 새로 클릭된 카테고리에 페이지 수 추가
    // css 따로 적용해야 해서 다른 span으로 감쌌음.

    if (type == "total") {
      if (!categorySection.querySelector(".current-page")) {
        const currentPageWrapper = createElement("", "current-page", "span");
        // 현재 페이지
        const currentPageSpan = createElement(
          currentPage,
          "current-page-number",
          "span"
        );

        // 전체 페이지
        const totalPageSpan = createElement(
          `/${totalPage}`,
          "total-page-number",
          "span"
        );

        currentPageWrapper.appendChild(currentPageSpan);
        currentPageWrapper.appendChild(totalPageSpan);

        categorySection.appendChild(currentPageWrapper);
      }
    } else if (type == "my") {
      // 괄호 짝을 맞추고, 쌍괄호로 수정
      if (!categorySection.querySelector(".icon-wrap")) {
        const iconWrapper = createElement("", "icon-wrap", "div");
        const icon = createElement("", "press-icon", "img");
        icon.src = "/src/assets/images/화살표.png"; // 경로 확인 필요
        iconWrapper.appendChild(icon);

        categorySection.appendChild(iconWrapper);
      }
    }

    categorySection.classList.add("selected-category");
    selectedCategory = categorySection;
  }

  async function initialize() {
    const newsData = await fetchNewsData();

    let categorySections = "";

    if (type == "total") {
      // map 사용해서 section 반환
      categorySections = categories
        .map(
          (category) => `
     <section>
       <span class="category-name">${category}</span>
     </section>
   `
        )
        .join("");
    } else if (type == "my") {
      // map 사용해서 section 반환
      categorySections = myPress
        .map(
          (press) => `
      <section>
        <span class="press-name">${press}</span>
      </section>
    `
        )
        .join("");
    }

    // 생성된 HTML을 categoryBar에 추가
    categoryBar.innerHTML = categorySections;

    categoryBar.querySelectorAll("section").forEach((categorySection) => {
      const categoryName =
        categorySection.querySelector(".category-name").innerText;
      const totalPage = getTotalPage(newsData, categoryName);

      categorySection.addEventListener("click", () =>
        onClickCategory(categorySection, type, totalPage)
      );
    });

    const firstCategorySection = categoryBar.querySelector("section");
    onClickCategory(
      firstCategorySection,
      type,
      getTotalPage(
        newsData,
        firstCategorySection.querySelector(".category-name").innerText
      )
    );
  }

  initialize();

  return categoryBar;
}

function getTotalPage(data, category) {
  const categoryData = Object.values(data).find(
    (item) => item.category === category
  );
  return categoryData ? categoryData.totalPage : 1;
}

export default CreateCategoryBar;
