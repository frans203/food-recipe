const icons = "./icons.b4f53cee.svg";
export default class View {
  recipeData;
  renderRecipe(data, render = true) {
    if (!data || Array.isArray(data && data.lenght === 0))
      return this.renderErrorMessage();
    this.recipeData = data;

    const html = this.generateMarkup();
    if (!render) return html;
    this.clear();
    this.parentElement.insertAdjacentHTML("afterbegin", html);
  }
  update(data) {
    this.recipeData = data;
    const newMarkup = this.generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = newDom.querySelectorAll("*");
    const curElements = this.parentElement.querySelectorAll("*");

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      if (!curEl) return;
      if (
        !curEl.isEqualNode(newEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        curEl.textContent = newEl.textContent;
      }

      if (!curEl.isEqualNode(newEl)) {
        Array.from(newEl.attributes).forEach((att) => {
          curEl.setAttribute(att.name, att.value);
        });
      }
    });
  }
  renderLoading() {
    const markup = `
      <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;
    this.clear();
    this.parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  clear() {
    this.parentElement.innerHTML = "";
  }

  renderErrorMessage(message = "Error with loading this feature! Try again") {
    this.clear();
    const markup = `
    <div class="error">
      <div>
          <svg>
            <use href="./img/icons.svg#icon-alert-triangle"></use>
          </svg>
        </div>
        <span>${message}</span>
      </div>`;

    this.parentElement.insertAdjacentHTML("beforeend", markup);
  }

  renderMessage(message = this.message) {
    const markup = `
    <div class="error">
      <div>
          <svg>
            <use href="./img/icons.svg#icon-smile"></use>
          </svg>
        </div>
        <span>${message}</span>
      </div>`;

    this.clear();

    this.parentElement.insertAdjacentHTML("beforeend", markup);
  }
}
