import { createElement } from "../utils/createElement.js";

function CreateCategoryBar() {
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

  let selectedCategory = null;
  let currentPage = 1;

  function onClickCategory(categorySection) {
    // 이전 선택된 카테고리 초기화
    if (selectedCategory && selectedCategory !== categorySection) {
      selectedCategory.classList.remove("selected-category");
      selectedCategory.querySelector(".current-page").remove();
    }

    // 새로 클릭된 카테고리에 페이지 수 추가
    // css 따로 적용해야해서 다른 span으로 감쌌음.
    if (!categorySection.querySelector(".current-page")) {
      const currentPageWrapper = createElement("", "current-page", "span");

      // // 현재 페이지
      const currentPageSpan = createElement(
        currentPage,
        "current-page-number",
        "span"
      );

      // // 전체 페이지
      const totalPageSpan = createElement("/81", "total-page-number", "span");

      currentPageWrapper.appendChild(currentPageSpan);
      currentPageWrapper.appendChild(totalPageSpan);

      categorySection.appendChild(currentPageWrapper);
    }

    categorySection.classList.add("selected-category");
    selectedCategory = categorySection;
  }

  // map 사용해서 section 반환
  const categorySections = categories
    .map(
      (category) => `
      <section>
        <span class="category-name">${category}</span>
      </section>
    `
    )
    .join("");

  // 생성된 HTML을 categoryBar에 추가
  categoryBar.innerHTML = categorySections;

  // 모든 섹션에 eventListener 추가
  categoryBar.querySelectorAll("section").forEach((categorySection) => {
    categorySection.addEventListener("click", () =>
      onClickCategory(categorySection)
    );
  });

  // 첫 번째 카테고리를 기본 선택 -> > querySelector는 지정된 선택자에 해당하는 첫 번째 요소만 선택함. 여러개의 요소가 있어도 첫번째로 발견한 요소 가져옴...
  onClickCategory(categoryBar.querySelector("section"));

  return categoryBar;
}

export default CreateCategoryBar;
