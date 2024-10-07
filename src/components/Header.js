import { getDate } from "../utils/getDate.js";

function header() {
  const createHeader = document.createElement("div");
  createHeader.id = "header";

  createHeader.innerHTML = `
    <div id="logo-section">
      <img src="./src/assets/images/뉴스로고.png" id="logo-img" alt="뉴스 로고">
      <h2 id="name">뉴스스탠드</h2>
    </div>
    <section id="date">${getDate()}</section>
  `;

  return createHeader;
}

export default header;
