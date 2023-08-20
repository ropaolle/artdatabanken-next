export default function setupAction(action: string, func: (id: string) => void, confirm = false) {
  if (typeof func !== "function") return;

  document.querySelectorAll(`.${action}-button`).forEach((button) => {
    button.addEventListener<any>(confirm ? "confirm.te.popconfirm" : "click", (e) => {
      e.stopPropagation();
      const index = button.getAttribute("data-te-index");
      if (index && index.length) {
        func(index);
      }
    });
  });
}
