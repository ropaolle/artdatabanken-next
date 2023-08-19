export default function setupAction(action: string, func: (index: string | null) => void) {
  document.querySelectorAll(`.${action}-button`).forEach((button) => {
    button.addEventListener<any>("click", (e) => {
      e.stopPropagation();
      func(button.getAttribute("data-te-index"));
    });
  });
}
