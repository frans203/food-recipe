import Output from "./Output.js";
import PreviewOut from "./previewOut.js";

class ResultsView extends Output {
  parentElement = document.querySelector(".results");
  generateMarkup() {
    return this.recipeData
      .map((re) => PreviewOut.renderRecipe(re, false))
      .join("");
  }
}

export default new ResultsView();
