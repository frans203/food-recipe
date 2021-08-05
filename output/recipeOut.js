// import icons from ".'./dist/icons.c4b52749.svg";
// "./dist/icons.b4f53cee.svg#icon-users"
import { Fraction } from "fractional";
import Output from "./Output.js";
const icons = "./icons.b4f53cee.svg";

class outputRecipe extends Output {
  parentElement = document.querySelector(".recipe");

  message;
  errorMessage;

  generateMarkup() {
    return `<figure class="recipe-fig">
    <img src="${this.recipeData.imageUrl}" alt="" />
    <h1 class="recipe-fig-h"><span>${this.recipeData.title}<span></h1>
  </figure>

  <div class="recipe-details">
    <div class="recipe-info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe-info--time">${this.recipeData.cookingTime}</span>
      <span class="recipe-info-minutes">minutes</span>
    </div>

    <div class="recipe-info">
      <svg class="recipe-info--icon">
        <use href="${icons}#icon-users"></use>
      </svg>

      <span class="recipe-info--number-serving">${
        this.recipeData.servings
      }</span>
      <span class="recipe-info-servings">Servings</span>
      <div class="recipe-info-btns">
        <button data-serv-to="${
          this.recipeData.servings - 1
        }" class="recipe-serv recipe-minus-serv">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>

        <button data-serv-to="${
          this.recipeData.servings + 1
        }" class="recipe-serv recipe-plus-serv">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe-user-genereted ${this.recipeData.key ? "" : "hidden"}">
        <svg>
         <use href="./icons.b4f53cee.svg#icon-user"></use>
        </svg>
    </div>

    <button class="recipe-serv btn-round btn-bookmark">
      <svg class="">
        <use href="${icons}#icon-bookmark${
      this.recipeData.bookmarked ? "-fill" : ""
    }"></use>
      </svg>
    </button>
  </div>

  <div class="recipe-ingredients">
    <h2 class="h-ingredients">Recipe ingredients</h2>

    <ul class="recipe-ingredient-list">
    ${this.recipeData.ingredients
      .map((ing) => this.renderIngredients(ing))
      .join(" ")}
      


    </ul>
  </div>

  <div class="recipe-directions">
    <h2 class="h-ingredients">How to cook it</h2>
    <p>
      This recipe was carefully designed and tested by ${
        this.recipeData.publisher
      }.
      Please check out directions at their website.
    </p>
     
    <a class="btn recipe-btn" href="${
      this.recipeData.sourceUrl
    }" target="_blank">
      <span>Directions</span>
      <svg class="search-icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div> `;
  }
  renderIngredients(ing) {
    return `
    <li class="recipe-ingredient">
    <svg class="recipe-icon">
      <use href="${icons}#icon-check"></use>
    </svg>
    <div class="recipe-quantity">${
      !ing.quantity ? "" : new Fraction(ing.quantity).toString()
    } ${" "}</div>

    <div class="recipe-description">
      <span class="recipe-unit">${ing.unit} </span>

      <span class="recipe-text">${ing.description} </span>
    </div>
  </li>`;
  }
  addHandlerRender(f) {
    ["hashchange", "load"].forEach((ev) => window.addEventListener(ev, f));
  }
  addHandlerUpdateServings(handler) {
    this.parentElement.addEventListener("click", function (e) {
      e.preventDefault();
      const btn = e.target.closest(".recipe-serv");
      if (!btn) return;
      const goTo = +btn.dataset.servTo;

      if (goTo > 0) handler(goTo);
    });
  }

  addHandleraddBookmark(handler) {
    this.parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn-bookmark");
      if (!btn) return;
      handler();
    });
  }
}

export default new outputRecipe();
