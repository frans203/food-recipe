import Output from "./Output.js";

class PaginationOut extends Output {
  parentElement = document.querySelector(".pagination");
  addHandlerPagination(handler) {
    this.parentElement.addEventListener("click", function (e) {
      e.preventDefault();
      const btn = e.target.closest(".btn--inline");
      const goTo = +btn.dataset.go;

      handler(goTo);
    });
  }
  generateMarkup() {
    const actualPage = this.recipeData.page;
    const totalPages = Math.ceil(
      this.recipeData.results.length / this.recipeData.resultsPerPage
    );

    //1) If theres more than one page. User in page one
    if (totalPages > 1 && actualPage === 1) {
      return `<button data-go= "${actualPage + 1}" class="btn--inline btn-next">
        <svg class="search-icon">
          <use href="./img/icons.svg#icon-arrow-right"></use>
        </svg>
        <span>Page ${actualPage + 1}</span>
      </button>`;
    }

    //2) If theres more than one page. User in last page
    if (totalPages > 1 && actualPage === totalPages) {
      return `<button data-go= "${actualPage - 1}" class="btn--inline btn-prev">
    <svg class="search__icon">
      <use href="src/img/icons.svg#icon-arrow-left"></use>
    </svg>
    <span>Page ${actualPage - 1}</span>
  </button>`;
    }
    //3) If user is is another page
    if (totalPages > 1 && actualPage < totalPages) {
      return `
        <button data-go= "${actualPage - 1}" class="btn--inline btn-prev">
            <svg class="search__icon">
            <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${actualPage - 1}</span>
        </button>
        
        <button data-go= "${actualPage + 1}" class="btn--inline btn-next">
                <svg class="search-icon">
                <use href="./img/icons.svg#icon-arrow-right"></use>
                </svg>
                <span>Page ${actualPage + 1}</span>
        </button>`;
    }
    return "";
  }
}

export default new PaginationOut();
