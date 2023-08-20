export default function setupAction(
  action: string,
  func: (id: string) => void,
) {
  document.querySelectorAll(`.${action}-button`).forEach((button) => {
    button.addEventListener<any>("click", (e) => {
      e.stopPropagation();
      const index = button.getAttribute("data-te-index");
      if (index && index.length) {
        func(index);
      }
    });
  });
}
