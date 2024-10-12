function PressNews() {
  const pressNews = document.createElement("div");
  pressNews.id = "press-news";

  function testFetchJSON() {
    const dataPath = "/src/data/news.json";

    fetch(dataPath)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("JSON data:", data); // JSON 데이터를 콘솔에 출력
      })
      .catch((error) => console.error("Error loading JSON:", error));
  }

  // 함수 호출
  testFetchJSON();

  return pressNews;
}

export default PressNews;
