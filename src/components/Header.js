import { getDate } from "../utils/getDate.js";

function header() {
  const createHeader = document.createElement("div");
  createHeader.id = "header";

  const logoSeciton = document.createElement("div");
  logoSeciton.id = "logo-section";

  const logoImg = document.createElement("img");
  logoImg.src = "./src/assets/images/뉴스로고.png";
  logoImg.id = "logo-img";

  logoSeciton.appendChild(logoImg);

  const name = document.createElement("h2");
  name.id = "name";

  name.innerText = "뉴스스탠드";

  logoSeciton.appendChild(name);

  createHeader.appendChild(logoSeciton);

  const todayDate = document.createElement("section");
  todayDate.id = "date";
  todayDate.innerText = getDate();

  createHeader.appendChild(todayDate);

  return createHeader;
}

export default header;
