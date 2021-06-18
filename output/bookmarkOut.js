import Output from "./Output.js";
import PreviewOut from "./previewOut.js";

class BookmarkOut extends Output {
  parentElement = document.querySelector(".bookmarks-list");
  errorMessage = "No bookmarks yet . Find a recipe and bookmark it!";
  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }
  generateMarkup() {
    return this.recipeData
      .map((bm) => PreviewOut.renderRecipe(bm, false))
      .join("");
  }
}

export default new BookmarkOut();
