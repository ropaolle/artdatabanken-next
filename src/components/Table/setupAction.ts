export default function setupAction(
  action: string,
  func: (_: string | null) => void,
) {
  document.querySelectorAll(`.${action}-button`).forEach((button) => {
    button.addEventListener<any>("click", (e) => {
      e.stopPropagation();
      func(button.getAttribute("data-te-index"));
    });
  });
}
