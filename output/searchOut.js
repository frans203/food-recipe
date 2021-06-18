class SearchView {
  parentElement = document.querySelector(".search");

  clearInput() {
    this.parentElement.querySelector(".field_search").value = "";
  }

  getQuery() {
    const query = this.parentElement.querySelector(".field_search").value;
    this.clearInput();
    return query;
  }

  addHandlerSearch(handler) {
    addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
