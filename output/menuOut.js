import Output from "./Output.js";

class menuOut extends Output {
  hambMenu = document.querySelector(".menu-btn");
  navItems = document.querySelectorAll(".nav-item");
  btnBookmark = document.querySelector(".btn-bm");
  bookmarks = document.querySelector(".bookmarks");
  searchResults = document.querySelector(".search-results");
  recipe = document.querySelector(".recipe");
  all = document.querySelector(".all");

  constructor() {
    super();
    this.toggleMenuItems();
    this.changeStyleBookmarks();
  }

  toggleMenuItemsFunction() {
    this.navItems.forEach((navI) => {
      navI.classList.toggle("menu-tog");
    });
    this.searchResults.classList.toggle("menu-tog");
    // this.recipe.classList.toggle("recipe-grid-area");
  }
  styleBookmarks() {
    this.bookmarks.classList.toggle("changeBookmarks");
  }

  toggleMenuItems() {
    this.hambMenu.addEventListener(
      "click",
      this.toggleMenuItemsFunction.bind(this)
    );
  }
  changeStyleBookmarks() {
    this.btnBookmark.addEventListener("click", this.styleBookmarks.bind(this));
  }
}

export default new menuOut();
