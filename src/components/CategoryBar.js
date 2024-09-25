function categoryBar() {
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
      const currentPageWrapper = document.createElement("span");
      currentPageWrapper.classList.add("current-page");

      // 현재 페이지
      const currentPageSpan = document.createElement("span");
      currentPageSpan.innerText = currentPage;
      currentPageSpan.classList.add("current-page-number");

      // 전체 페이지
      const totalPageSpan = document.createElement("span");
      totalPageSpan.innerText = "/81";
      totalPageSpan.classList.add("total-page-number");

      currentPageWrapper.appendChild(currentPageSpan);
      currentPageWrapper.appendChild(totalPageSpan);

      categorySection.appendChild(currentPageWrapper);
    }

    categorySection.classList.add("selected-category");
    selectedCategory = categorySection;
  }

  categories.forEach((category) => {
    const categorySection = document.createElement("section");

    const categoryName = document.createElement("span");
    categoryName.innerText = category;
    categoryName.classList.add("category-name");

    categorySection.appendChild(categoryName);

    // 클릭 이벤트 리스너 추가
    categorySection.addEventListener("click", () =>
      onClickCategory(categorySection)
    );

    categoryBar.appendChild(categorySection);
  });

  document.body.appendChild(categoryBar);

  // 첫 번째 카테고리를 기본 선택 -> > querySelector는 지정된 선택자에 해당하는 첫 번째 요소만 선택함. 여러개의 요소가 있어도 첫번째로 발견한 요소 가져옴...
  onClickCategory(categoryBar.querySelector("section"));
}

export default categoryBar;
