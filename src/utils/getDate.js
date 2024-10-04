export function getDate() {
  const today = new Date();
  const datStr = ["일", "월", "화", "수", "목", "금", "토"];

  const a =
    today.getFullYear() +
    ". " +
    (today.getMonth() + 1) +
    ". " +
    today.getDate() +
    ". " +
    datStr[today.getDay()] +
    "요일";

  return a;
}
