import { createElement } from "../utils/createElement.js";

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
    if (selectedCategory && selectedCategory !== categorySection) {
      selectedCategory.classList.remove("selected-category");
      selectedCategory.querySelector(".current-page")?.remove();
    }

    if (type === "total") {
      if (!categorySection.querySelector(".current-page")) {
        const currentPageWrapper = createElement("", "current-page", "span");
        const currentPageSpan = createElement(
          currentPage,
          "current-page-number",
          "span"
        );
        const totalPageSpan = createElement(
          `/${totalPage}`,
          "total-page-number",
          "span"
        );
        currentPageWrapper.appendChild(currentPageSpan);
        currentPageWrapper.appendChild(totalPageSpan);
        categorySection.appendChild(currentPageWrapper);
      }
    } else if (type === "my") {
      if (!categorySection.querySelector(".icon-wrap")) {
        const iconWrapper = createElement("", "icon-wrap", "div");
        const icon = createElement("", "press-icon", "img");
        icon.src = "/src/assets/images/화살표.png";
        iconWrapper.appendChild(icon);
        categorySection.appendChild(iconWrapper);
      }
    }

    categorySection.classList.add("selected-category");
    selectedCategory = categorySection;
  }

  async function initialize() {
    const newsData = type === "total" ? await fetchNewsData() : null;

    let categorySections = "";

    if (type === "total") {
      categorySections = categories
        .map(
          (category) => `
     <section>
       <span class="category-name">${category}</span>
     </section>
   `
        )
        .join("");
    } else if (type === "my") {
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

    categoryBar.innerHTML = categorySections;

    categoryBar.querySelectorAll("section").forEach((categorySection) => {
      if (type === "total") {
        const categoryName =
          categorySection.querySelector(".category-name").innerText;
        const totalPage = getTotalPage(newsData, categoryName);

        categorySection.addEventListener("click", () =>
          onClickCategory(categorySection, type, totalPage)
        );
      } else if (type === "my") {
        categorySection.addEventListener("click", () =>
          onClickCategory(categorySection, type)
        );
      }
    });

    if (type === "total") {
      const firstCategorySection = categoryBar.querySelector("section");
      if (firstCategorySection) {
        onClickCategory(
          firstCategorySection,
          type,
          getTotalPage(
            newsData,
            firstCategorySection.querySelector(".category-name").innerText
          )
        );
      }
    } else if (type === "my") {
      const firstCategorySection = categoryBar.querySelector("section");
      if (firstCategorySection) {
        onClickCategory(firstCategorySection, type);
      }
    }
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
