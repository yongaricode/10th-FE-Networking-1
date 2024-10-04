export function createElement(innerText, classList, type) {
  const span = document.createElement(type);
  span.innerText = innerText;
  span.classList.add(classList);

  return span;
}
