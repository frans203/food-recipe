import Output from "./Output.js";
class addRecipeOut extends Output {
  parentElement = document.querySelector(".upload");
  window = document.querySelector(".add-recipe-window");
  overlay = document.querySelector(".overlay");
  btnOpen = document.querySelector(".btn-ar");
  btnClose = document.querySelector(".close-modal");
  message = "Successfully add recipe!";
  constructor() {
    super();
    this.addHandlerShowWindow();
    this.addHandlerCloseWindow();
  }
  toggleWindow() {
    this.window.classList.toggle("hidden");
    this.overlay.classList.toggle("hidden");
  }
  addHandlerShowWindow() {
    this.btnOpen.addEventListener("click", this.toggleWindow.bind(this));
  }

  addHandlerCloseWindow() {
    this.btnClose.addEventListener("click", this.toggleWindow.bind(this));
    this.overlay.addEventListener("click", this.toggleWindow.bind(this));
  }
  addHandlerUpload(handler) {
    this.parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
  generateMarkup() {}
}
export default new addRecipeOut();
